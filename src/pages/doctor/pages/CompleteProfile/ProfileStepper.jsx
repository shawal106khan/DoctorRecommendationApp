import { Check } from "lucide-react";

const ProfileStepper = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#D6E6F2] -z-0" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] transition-all duration-500 -z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isDone = index < currentStep;
          const isActive = index === currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2 z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isDone
                    ? "bg-[#1A6FA8] border-[#1A6FA8]"
                    : isActive
                      ? "bg-white border-[#1A6FA8] shadow-[0_0_0_4px_rgba(26,111,168,0.15)]"
                      : "bg-white border-[#D6E6F2]"
                }`}
              >
                {isDone ? (
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <span
                    className={`text-xs font-bold ${isActive ? "text-[#1A6FA8]" : "text-[#8AAEC8]"}`}
                  >
                    {index + 1}
                  </span>
                )}
              </div>
              <p
                className={`text-[10px] font-semibold uppercase tracking-wide text-center hidden sm:block ${
                  isActive
                    ? "text-[#1A6FA8]"
                    : isDone
                      ? "text-[#4A6680]"
                      : "text-[#8AAEC8]"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileStepper;
