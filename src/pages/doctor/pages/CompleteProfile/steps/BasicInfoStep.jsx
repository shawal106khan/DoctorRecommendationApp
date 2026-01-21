import Button from "../../../../../components/common/components/Button";
import Input from "../../../../../components/common/components/Input";
import AvatarUpload from "../../../../../components/common/components/AvatarUpload";
import Title from "../../../../../components/common/components/Title";

import { useRequiredValidation } from "../../../../../hooks/useRequiredValidation";

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
    <div className=" max-w-md  mx-auto p-6">
      <Title heading="Complete Your Profile" subheading="Basic Information" />

      {/* PROFILE PHOTO */}
      <AvatarUpload
        image={profile.profileImage}
        onChange={(file) => setProfile({ ...profile, profileImage: file })}
      />

      <div className="mt-7 ">
        {/* BIO */}
        <div className="mb-7">
          <label className="block text-sm mb-1 font-body text-gray-600">
            Professional Bio
          </label>
          {errors.bio && (
            <span className="text-red-500 text-xs mb-2">{errors.bio}</span>
          )}

          <textarea
            rows={4}
            value={profile.bio}
            placeholder="Write a brief professional bio..."
            onChange={(e) => {
              setProfile({ ...profile, bio: e.target.value });

              if (errors.bio) {
                setErrors((prev) => ({ ...prev, bio: null }));
              }
            }}
            className="w-full border rounded-lg p-3 focus:ring-2 outline-none focus:ring-blue-500 font-body text-xs shadow-lg shadow-slate-300"
          />
        </div>

        {/* LANGUAGES */}
        <div className="mb-7">
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
              if (errors.languages) {
                setErrors((prev) => ({ ...prev, languages: null }));
              }
            }}
          />
          <p className="text-xs text-gray-500 mt-1 font-body">
            Separate languages with commas.
          </p>
        </div>

        {/* GENDER */}
        <div className="mb-8">
          <label className="block text-sm mb-1 font-body text-gray-600">
            Gender (Optional)
          </label>
          <select
            value={profile.gender || ""}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className="w-full border rounded-lg p-2 font-body text-xs
             focus:ring-2 outline-none focus:ring-blue-500 shadow-lg shadow-slate-300 text-gray-400"
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* ACTION */}
      <div className="mt-8 text-center text-sm">
        {/* <span
          onClick={onNext}
          className="cursor-pointer bg-blue-600 p-3 border border-gray-400 rounded-lg text-white font-medium hover:underline hover:bg-gray-800 "
        >
          Next →
        </span> */}
        <Button text="Next →" onClick={handleNext} />
      </div>
    </div>
  );
};

export default BasicInfoStep;
