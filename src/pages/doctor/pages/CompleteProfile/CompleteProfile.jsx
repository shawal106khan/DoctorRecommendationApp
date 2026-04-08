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
import {
  getCurrentUserId,
  getDoctorIdByUser,
  markProfileCompleted,
  uploadDoctorProfileImage,
  upsertDoctorAvailability,
  upsertDoctorLocation,
  upsertDoctorProfile,
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
  slotDuration: 30,
  address: "",
  city: "",
  hospitalName: "",
  landmark: "",
  mapLink: "",
};

const steps = [
  "Basic Info",
  "Professional",
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
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

        {currentStep === 2 && (
          <AvailabilityStep
            profile={profile}
            setProfile={setProfile}
            onNext={next}
            onBack={back}
          />
        )}

        {currentStep === 3 && (
          <LocationStep
            profile={profile}
            setProfile={setProfile}
            onNext={next}
            onBack={back}
          />
        )}

        {currentStep === 4 && <VerificationStep onNext={next} onBack={back} />}

        {currentStep === 5 && (
          <ReviewStep
            profile={profile}
            onBack={back}
            onFinish={finishProfile}
          />
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
