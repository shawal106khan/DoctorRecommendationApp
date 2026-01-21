import Title from "../../../../../components/common/components/Title";
const VerificationStep = ({ onNext, onBack }) => {
  return (
    <div className="max-w-md  mx-auto p-6">
      <Title
        heading="Verification Status"
        subheading="Your profile is verified by our admin team"
      />

      <div className="bg-green-50 border border-green-200 px-4 py-9 rounded-lg">
        <p className="font-medium text-green-700">Approved</p>
        <p className="text-sm text-green-600 mt-1">
          Your medical license has been verified by our admin team.
        </p>
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
          className="cursor-pointer bg-blue-600 
           border border-gray-400 rounded-lg py-2 px-5 
            text-white font-medium hover:underline"
        >
          Next →
        </span>
      </div>
    </div>
  );
};

export default VerificationStep;
