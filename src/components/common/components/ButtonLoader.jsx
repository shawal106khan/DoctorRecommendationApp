const ButtonLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

      <span>{text}</span>
    </div>
  );
};

export default ButtonLoader;
