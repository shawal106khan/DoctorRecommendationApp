import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import { useNavigate } from "react-router-dom";

import ProfileStepper from "./ProfileStepper";
import BasicInfoStep from "./steps/BasicInfoStep";
import ProfessionalStep from "./steps/ProfessionalStep";
import AvailabilityStep from "./steps/AvailabilityStep";
import LocationStep from "./steps/LocationStep";
import VerificationStep from "./steps/VerificationStep";
import ReviewStep from "./steps/ReviewStep";
import { saveDoctor } from "../../../../store/doctorStore";

// ✅ Initial profile state
const initialProfile = {
  bio: "",
  languages: [],
  avatar: null,
  consultationFee: "",
  consultationType: "online",
  availableDays: [],
  startTime: "",
  endTime: "",
  slotDuration: 30,
  address: "",
  city: "",
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
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(initialProfile);
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => s + 1);
  const back = () => setCurrentStep((s) => s - 1);

  const finishProfile = () => {
    setUser((prev) => {
      const updatedDoctor = {
        ...prev,
        profileCompleted: true,
        avatar: profile.avatar ?? prev.avatar,
        role: "doctor", // 🔹 Always include role
      };

      saveDoctor(updatedDoctor);
      return updatedDoctor;
    });

    navigate("/doctor/dashboard", { replace: true });
  };

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
