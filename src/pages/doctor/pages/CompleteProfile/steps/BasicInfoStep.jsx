import Input from "../../../../../components/common/components/Input";
import AvatarUpload from "../../../../../components/common/components/AvatarUpload";
import Button from "../../../../../components/common/components/Button";
import { useRequiredValidation } from "../../../../../hooks/useRequiredValidation";
import { StepHeader } from "../../../../../components/common/components/StepComponents";

const BasicInfoStep = ({ profile, setProfile, onNext }) => {
  const { errors, validate, setErrors } = useRequiredValidation({
    bio: "Professional bio is required",
    languages: "At least one language is required",
  });

  const handleNext = () => {
    const isValid = validate({
      bio: profile.bio,
      languages: profile.languages.length > 0,
    });
    if (!isValid) return;
    onNext();
  };

  return (
    <div className="max-w-lg mx-auto px-2 py-4">
      <StepHeader title="Complete Your Profile" subtitle="Basic Information" />
      <AvatarUpload
        image={profile.avatar || null}
        onChange={(file) => {
          const preview = URL.createObjectURL(file);
          setProfile({ ...profile, avatar: preview, avatarFile: file });
        }}
      />

      <div className="mt-6 space-y-5">
        {/* Bio */}
        <div>
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
            Professional Bio
          </label>
          {errors.bio && (
            <p className="text-red-500 text-xs mb-1.5">{errors.bio}</p>
          )}
          <textarea
            rows={4}
            value={profile.bio}
            placeholder="Write a brief professional bio..."
            onChange={(e) => {
              setProfile({ ...profile, bio: e.target.value });
              if (errors.bio) setErrors((prev) => ({ ...prev, bio: null }));
            }}
            className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition placeholder:text-[#AAC2D4] focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
          />
        </div>

        {/* Languages */}
        <div>
          <Input
            label="Languages Spoken"
            error={errors.languages}
            placeholder="e.g. English, Urdu, Punjabi"
            value={profile.languages.join(", ")}
            onChange={(e) => {
              setProfile({
                ...profile,
                languages: e.target.value.split(",").map((l) => l.trim()),
              });
              if (errors.languages)
                setErrors((prev) => ({ ...prev, languages: null }));
            }}
          />
          <p className="text-xs text-[#8AAEC8] -mt-3">
            Separate languages with commas.
          </p>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
            Gender
          </label>
          <select
            value={profile.gender || ""}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className="w-full h-12 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <Button text="Next" onClick={handleNext} />
      </div>
    </div>
  );
};

export default BasicInfoStep;
