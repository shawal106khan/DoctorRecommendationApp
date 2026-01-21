import Button from "../../../../../components/common/components/Button";
import { useAuth } from "../../../../../context/useAuth";
import Title from "../../../../../components/common/components/Title";
const ProfessionalStep = ({ onNext, onBack }) => {
  const { user } = useAuth();
  console.log("USER IN PRO STEP:", user);
  return (
    <div className="max-w-md  mx-auto p-6">
      <Title
        heading="Professional Information"
        subheading="These details were provided during signup and verified by admin."
      />

      <div className="grid grid-cols-2 gap-6 bg-gray-50 p-10 rounded-lg shadow-lg shadow-gray-200 ">
        <Info label="Specialization" value={user.specialization} />
        <Info
          label="Experience"
          value={user?.experienceYears ? `${user.experienceYears} years` : null}
        />
        <Info label="Qualification" value={user.qualification} />
        <Info label="Hospital" value={user.hospitalName} />
        <Info label="License Number" value={user.licenseNumber} />
        <Info label="Phone" value={user.phone} />
      </div>

      <div className="mt-8 flex justify-between text-sm">
        <span
          onClick={onBack}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        >
          ← Back
        </span>

        <span
          onClick={onNext}
          className="cursor-pointer bg-blue-600 py-2 px-5 
          border border-gray-400 rounded-lg text-white 
          font-medium hover:underline"
        >
          Next →
        </span>
      </div>
    </div>
  );
};

/* ✅ SMALL INTERNAL COMPONENT */
const Info = ({ label, value }) => (
  <div>
    <p className="text-base text-gray-800">{label}</p>
    <p className="font-medium text-gray-600 text-xs">
      {value ? (
        value
      ) : (
        <span className="text-gray-400 font-light text-xs">Not provided</span>
      )}
    </p>
  </div>
);

export default ProfessionalStep;
