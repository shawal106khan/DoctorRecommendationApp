const Input = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-xs  text-gray-600 mb-1 font-heading">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border rounded-md shadow-lg font-body ,
        placeholder:text-xs ,
         focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
