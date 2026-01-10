const Button = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 text-white py-3 rounded-lg 
                 font-semibold font-body hover:bg-blue-700 transition"
    >
      {text}
    </button>
  );
};

export default Button;
