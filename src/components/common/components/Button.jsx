const Button = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full h-12 sm:my-7 bg-[#1A6FA8] hover:bg-[#155e8f] active:scale-[0.99] text-white text-[15px] font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
    >
      {text}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
};

export default Button;
