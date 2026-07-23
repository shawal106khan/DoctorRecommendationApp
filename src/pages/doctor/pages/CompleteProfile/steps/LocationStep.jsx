import { useEffect } from "react";
import Input from "../../../../../components/common/components/Input";
import { useRequiredValidation } from "../../../../../hooks/useRequiredValidation";
import { StepHeader } from "../../../../../components/common/components/StepComponents";

const LocationStep = ({ profile, setProfile, onNext, onBack }) => {
  const { errors, validate, setErrors } = useRequiredValidation({
    hospitalName: "Clinic name is required",
    address: "Address is required",
    city: "City is required",
    landmark: "Landmark is required",
  });

  useEffect(() => {
    if (profile?.clinicName && !profile?.hospitalName) {
      setProfile({ ...profile, hospitalName: profile.clinicName });
    }
  }, [profile, setProfile]);

  const handleNext = () => {
    const isValid = validate({
      hospitalName: profile.hospitalName,
      address: profile.address,
      city: profile.city,
      landmark: profile.landmark,
    });
    if (!isValid) return;
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto px-2 py-4">
      <StepHeader
        title="Location"
        subtitle="Help patients easily find your clinic"
      />
      <div className="space-y-1">
        <Input
          label="Hospital Name"
          error={errors.hospitalName}
          placeholder="e.g. City Health Hospital"
          value={profile.hospitalName || ""}
          onChange={(e) => {
            setProfile({ ...profile, hospitalName: e.target.value });
            if (errors.hospitalName)
              setErrors((p) => ({ ...p, hospitalName: null }));
          }}
        />
        <Input
          label="Full Address"
          error={errors.address}
          placeholder="e.g. 123 Main Street"
          value={profile.address}
          onChange={(e) => {
            setProfile({ ...profile, address: e.target.value });
            if (errors.address) setErrors((p) => ({ ...p, address: null }));
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="City"
            error={errors.city}
            placeholder="e.g Swat"
            value={profile.city}
            onChange={(e) => {
              setProfile({ ...profile, city: e.target.value });
              if (errors.city) setErrors((p) => ({ ...p, city: null }));
            }}
          />
          <Input
            label="Nearby Landmark"
            error={errors.landmark}
            placeholder="e.g. Near the bus stop"
            value={profile.landmark || ""}
            onChange={(e) => {
              setProfile({ ...profile, landmark: e.target.value });
              if (errors.landmark) setErrors((p) => ({ ...p, landmark: null }));
            }}
          />
        </div>
        <Input
          label="Google Maps Link (optional)"
          placeholder="https://maps.google.com/..."
          value={profile.mapLink || ""}
          onChange={(e) => setProfile({ ...profile, mapLink: e.target.value })}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#4A6680] hover:text-[#1A6FA8] transition"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
