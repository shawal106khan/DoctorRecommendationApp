import Button from "../../../../../components/common/components/Button";
import Input from "../../../../../components/common/components/Input";
import Title from "../../../../../components/common/components/Title";
import { useRequiredValidation } from "../../../../../hooks/useRequiredValidation";

const LocationStep = ({ profile, setProfile, onNext, onBack }) => {
  const { errors, validate, setErrors } = useRequiredValidation({
    clinicName: "Clinic name is required",
    address: "Address is required",
    city: "City is required",
    landmark: "Landmark is required",
  });

  const handleNext = () => {
    const isValid = validate({
      clinicName: profile.clinicName,
      address: profile.address,
      city: profile.city,
      landmark: profile.landmark,
    });

    if (!isValid) return;
    onNext();
  };

  return (
    <div className="max-w-md  mx-auto p-6">
      <Title
        heading="Location"
        subheading="Help patients easily find your clinic"
      />
      <Input
        label="Clinic Name"
        error={errors.clinicName}
        placeholder="e.g. City Health Clinic"
        value={profile.clinicName || ""}
        onChange={(e) => {
          setProfile({ ...profile, clinicName: e.target.value });
          if (errors.clinicName) {
            setErrors((prev) => ({ ...prev, clinicName: null }));
          }
        }}
      />

      <Input
        label="Full Address"
        error={errors.address}
        placeholder="e.g. 123 Main Street, Apt 4B"
        value={profile.address}
        onChange={(e) => {
          setProfile({ ...profile, address: e.target.value });
          if (errors.address) {
            setErrors((prev) => ({ ...prev, address: null }));
          }
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
            if (errors.city) {
              setErrors((prev) => ({ ...prev, city: null }));
            }
          }}
        />

        <Input
          label="Nearby Landmark"
          error={errors.landmark}
          placeholder="e.g. Near the bus stop"
          value={profile.landmark || ""}
          onChange={(e) => {
            setProfile({ ...profile, landmark: e.target.value });
            if (errors.landmark) {
              setErrors((prev) => ({ ...prev, landmark: null }));
            }
          }}
        />
      </div>

      <Input
        label="Google Maps Link (optional)"
        placeholder="https://maps.google.com/..."
        value={profile.mapLink || ""}
        onChange={(e) => setProfile({ ...profile, mapLink: e.target.value })}
      />

      <div className="mt-8 flex justify-between text-sm">
        <span
          onClick={onBack}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        >
          ← Back
        </span>

        <span
          onClick={handleNext}
          className="cursor-pointer bg-blue-600 
          border border-gray-400 
          py-2 px-5 rounded-lg text-white font-medium 
          hover:underline"
        >
          Next →
        </span>
      </div>
    </div>
  );
};

export default LocationStep;
