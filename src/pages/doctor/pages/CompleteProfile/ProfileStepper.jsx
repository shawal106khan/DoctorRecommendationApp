const ProfileStepper = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between mb-8 w-full max-w-md mx-auto gap-4">
      {steps.map((step, index) => (
        <div key={step} className="flex-1 text-center">
          <div
            className={`h-1 rounded ${
              index <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
          <p className="text-xs mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStepper;
