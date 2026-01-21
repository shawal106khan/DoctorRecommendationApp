const StepFooter = ({ currentStep, totalSteps, onBack, onNext }) => {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className="text-gray-600 hover:text-gray-900 disabled:opacity-40"
      >
        Back
      </button>

      <span className="text-sm text-gray-500">
        Step {currentStep + 1} of {totalSteps}
      </span>

      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default StepFooter;
