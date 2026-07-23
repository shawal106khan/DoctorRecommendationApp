export const StepNav = ({
  onBack,
  onNext,
  nextLabel = "Next →",
  backLabel = "← Back",
}) => (
  <div className="mt-8 flex items-center justify-between">
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-sm font-semibold text-[#4A6680] hover:text-[#1A6FA8] transition"
    >
      {backLabel}
    </button>
    <button
      onClick={onNext}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:shadow-[0_6px_20px_rgba(26,111,168,0.40)] hover:scale-[1.02] active:scale-[0.98] transition-all"
    >
      {nextLabel}
    </button>
  </div>
);

export const StepHeader = ({ title, subtitle }) => (
  <div className="mb-7">
    <div className="flex items-center gap-2 mb-1">
      <div className="w-1 h-5 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
      <h2 className="text-lg font-bold text-[#0D2E4E]">{title}</h2>
    </div>
    {subtitle && <p className="text-xs text-[#6B839A] ml-3">{subtitle}</p>}
  </div>
);
