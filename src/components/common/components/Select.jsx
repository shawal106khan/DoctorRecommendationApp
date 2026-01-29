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
        <label className="block text-xs  text-gray-600 mb-1 font-heading">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-md shadow-lg shadow-gray-300
                   text-sm text-gray-700 font-serif
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
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
