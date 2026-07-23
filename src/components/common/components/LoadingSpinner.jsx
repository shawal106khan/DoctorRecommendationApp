const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative w-10 h-10">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-[#D6E6F2]" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1A6FA8] border-r-[#38B2A0] animate-spin" />
      </div>
      {text && (
        <p className="text-[#4A6680] text-xs font-semibold uppercase tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
