const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  onKeyDown,
}) => {
  return (
    <div className="mb-1">
      {label && (
        <label className="block text-[10px] sm:text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`w-full h-10 sm:h-12 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] outline-none transition placeholder:text-[#AAC2D4] focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 ${
          error ? "border-red-400 bg-red-50" : "border-[#D6E6F2]"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
