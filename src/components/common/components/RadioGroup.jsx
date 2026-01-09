const RadioGroup = ({ label, name, options, value, onChange }) => {
  return (
    <div className="mb-8">
      {label && (
        <p className="text-sm font-medium text-gray-700 mb-3 font-body">
          {label}
        </p>
      )}

      <div className=" gap-4 ">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 font-body"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="accent-blue-600"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
