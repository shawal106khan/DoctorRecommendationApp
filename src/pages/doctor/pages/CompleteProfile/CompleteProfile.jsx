import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/useAuth";

import ProfileStepper from "./ProfileStepper";
import BasicInfoStep from "./steps/BasicInfoStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import AvailabilityStep from "./steps/AvailabilityStep";
import LocationStep from "./steps/LocationStep";
import VerificationStep from "./steps/VerificationStep";
import ReviewStep from "./steps/ReviewStep";
import ConsultationStep from "./steps/ConsultationsStep";
import {
  getCurrentUserId,
  getDoctorIdByUser,
  markProfileCompleted,
  uploadDoctorProfileImage,
  upsertDoctorAvailability,
  upsertDoctorLocation,
  upsertDoctorProfile,
  saveDoctorFee,
} from "../../../../services/doctorService";

// ? Initial profile state
const initialProfile = {
  bio: "",
  languages: [],
  avatar: null,
  gender: "",
  consultationFee: "",
  consultationType: "online",
  availableDays: [],
  startTime: "",
  endTime: "",
  slotDuration: "",
  address: "",
  city: "",
  hospitalName: "",
  landmark: "",
  mapLink: "",
};

const steps = [
  "Basic Info",
  "Professional",
  "Consultation",
  "Availability",
  "Location",
  "Verification",
  "Review",
];

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => s + 1);
  const back = () => setCurrentStep((s) => s - 1);

  useEffect(() => {
    if (!profile.avatar) return;
    // Show preview in Topbar while completing profile
    setUser((prev) => ({ ...prev, avatar: profile.avatar }));
  }, [profile.avatar, setUser]);

  const finishProfile = async () => {
    try {
      const userId = await getCurrentUserId();
      const doctorsId = await getDoctorIdByUser(userId);

      let profilePicUrl = null;
      if (profile.avatarFile) {
        profilePicUrl = await uploadDoctorProfileImage(
          userId,
          profile.avatarFile,
        );
      }
      const language = profile.languages.join(", ");

      await upsertDoctorProfile(doctorsId, {
        profile_pic_url: profilePicUrl,
        bio: profile.bio,
        gender: profile.gender,
        language,
      });
      await upsertDoctorAvailability(doctorsId, profile);
      await upsertDoctorLocation(doctorsId, profile);
      await saveDoctorFee(doctorsId, profile.consultationFee);
      await markProfileCompleted(doctorsId);

      setUser((prev) => ({
        ...prev,
        avatar: profilePicUrl || profile.avatar || prev?.avatar || null,
      }));

      navigate("/doctor/dashboard", { replace: true });
    } catch (err) {
      alert(err.message || "Something went Wrong");
    }
  };
  console.log(profile);

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
        <p className="text-white/75 text-xs font-medium tracking-wide">
          Complete your profile to start receiving patients
        </p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-8">
          <ProfileStepper steps={steps} currentStep={currentStep} />

          {currentStep === 0 && (
            <BasicInfoStep
              profile={profile}
              setProfile={setProfile}
              onNext={next}
            />
          )}
          {currentStep === 1 && (
            <ProfessionalStep
              profile={profile}
              setProfile={setProfile}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 2 && ( // ✅ new
            <ConsultationStep
              profile={profile}
              setProfile={setProfile}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 3 && (
            <AvailabilityStep
              profile={profile}
              setProfile={setProfile}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 4 && (
            <LocationStep
              profile={profile}
              setProfile={setProfile}
              onNext={next}
              onBack={back}
            />
          )}
          {currentStep === 5 && (
            <VerificationStep onNext={next} onBack={back} />
          )}
          {currentStep === 6 && (
            <ReviewStep
              profile={profile}
              onBack={back}
              onFinish={finishProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
