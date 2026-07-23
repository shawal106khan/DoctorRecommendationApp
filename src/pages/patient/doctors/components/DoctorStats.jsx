import { Star, Banknote } from "lucide-react";

const DoctorStats = ({ doctor, average, count, distribution }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-6">
      {/* ✅ Fee & Consultation Type */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
        <h3 className="text-base font-bold text-[#0D2E4E]">
          Consultation Info
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F4FD] flex items-center justify-center flex-shrink-0">
            <Banknote size={16} className="text-[#1A6FA8]" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
              Fee
            </p>
            <p className="text-sm font-bold text-[#0D2E4E]">
              {doctor?.consultationFee
                ? `PKR ${doctor.consultationFee}`
                : "Not set"}
            </p>
          </div>
        </div>
      </div>

      {/* Ratings header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
        <h3 className="text-base font-bold text-[#0D2E4E]">
          Ratings & Reviews
        </h3>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] shadow-[0_4px_16px_rgba(26,111,168,0.30)] flex-shrink-0">
          <span className="text-2xl font-bold text-white leading-none">
            {average}
          </span>
          <span className="text-white/60 text-[10px] mt-0.5">out of 5</span>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400"
                fill={i < Math.round(average) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-[#0D2E4E]">
            {count} Reviews
          </p>
          <p className="text-xs text-[#6B839A]">
            Based on verified patient feedback
          </p>
        </div>
      </div>

      {/* Distribution */}
      <div className="space-y-2.5">
        {distribution.map((d) => (
          <div key={d.star} className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 w-10 flex-shrink-0">
              <span className="text-xs font-semibold text-[#4A6680]">
                {d.star}
              </span>
              <Star size={10} className="text-yellow-400" fill="currentColor" />
            </div>
            <div className="flex-1 bg-[#F0F4F8] rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] transition-all duration-500"
                style={{ width: `${d.percent}%` }}
              />
            </div>
            <span className="text-xs text-[#6B839A] w-10 text-right">
              {d.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorStats;
