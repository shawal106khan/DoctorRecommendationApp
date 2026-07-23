const RadioGroup = ({ label, name, options, value, onChange }) => {
  return (
    <div className="mb-5">
      {label && (
        <p className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
          {label}
        </p>
      )}

      <div className="gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-sm text-[#0D2E4E]"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="accent-[#1A6FA8]"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
