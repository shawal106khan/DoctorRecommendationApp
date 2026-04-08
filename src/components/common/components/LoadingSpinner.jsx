const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm text-center">
      <div className="w-8 h-8 border-l-indigo-700 border-r-2 border-l-2  border-r-pink-600  rounded-full animate-spin" />
      {text}
    </div>
  );
};

export default LoadingSpinner;
