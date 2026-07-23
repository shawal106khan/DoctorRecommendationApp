const DoctorRating = ({ average, count, size = "sm" }) => {
  if (!count) {
    return (
      <span className="text-[10px] text-[#8AAEC8] font-medium">
        No reviews yet
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`text-yellow-400 ${size === "lg" ? "text-lg" : "text-sm"}`}
      >
        ★
      </span>
      <span
        className={`font-bold text-[#0D2E4E] ${size === "lg" ? "text-sm" : "text-xs"}`}
      >
        {average}
      </span>
      <span className="text-[10px] text-[#8AAEC8]">({count})</span>
    </div>
  );
};

export default DoctorRating;
