const Input = ({ label, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-xs  text-gray-600 mb-1 font-heading">
          {label}
        </label>
      )}
      {error && <span className="text-red-500 text-xs mb-2">{error}</span>}
      <input
        label={label}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-md shadow-lg font-serif
               text-sm text-gray-800
              placeholder:text-xs
              focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
