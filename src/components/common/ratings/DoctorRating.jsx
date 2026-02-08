const DoctorRating = ({ average, count, size = "sm" }) => {
  if (!count) {
    return <span className="text-xs text-gray-400">No reviews yet</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <span
        className={`text-yellow-500 ${size === "lg" ? "text-lg" : "text-sm"}`}
      >
        ★
      </span>
      <span className="font-medium text-gray-800">{average}</span>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
};

export default DoctorRating;
