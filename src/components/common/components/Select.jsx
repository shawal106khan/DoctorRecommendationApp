const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
