import { useNavigate } from "react-router-dom";
import { getDoctorAverageRating } from "../../../utils/doctorRatings";
import DoctorRating from "../../../components/common/ratings/DoctorRating";
import { useEffect, useState } from "react";
import {
  Briefcase,
  ArrowRight,
  Info,
  Banknote,
  Trophy,
  Star,
  Stethoscope,
} from "lucide-react";

const categoryConfig = {
  "Best Match": { bg: "from-green-500 to-emerald-600", icon: "🏆" },
  "Highly Recommended": { bg: "from-[#1A6FA8] to-[#336aac]", icon: "⭐" },
  Recommended: { bg: "from-[#38B2A0] to-[#2d9e8f]", icon: "✅" },
};

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const { average: avg, count: cnt } = await getDoctorAverageRating(
          doctor.id,
        );
        setAverage(avg);
        setCount(cnt);
      } catch (error) {
        console.error("Error loading rating:", error);
      }
    };
    fetchRating();
  }, [doctor.id]);

  const catCfg = categoryConfig[doctor.recommendationCategory];

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_24px_rgba(26,111,168,0.10)] hover:shadow-[0_12px_40px_rgba(26,111,168,0.18)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col">
      {/* ── CARD HEADER ── */}
      <div className="relative bg-gradient-to-br from-[#F0F7FF] to-[#E8F4FD] px-4 sm:px-5 pt-4 sm:pt-5 pb-4">
        {/* Category ribbon — top right */}
        {doctor.recommendationCategory && catCfg && (
          <div
            className={`absolute top-0 right-0 bg-gradient-to-r ${catCfg.bg} text-white text-[9px] font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1`}
          >
            <span>{catCfg.icon}</span>
            {doctor.recommendationCategory}
          </div>
        )}

        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-[0_4px_12px_rgba(26,111,168,0.15)]">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm" />
          </div>

          {/* Name + rating + specialization */}
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="font-bold text-[#0D2E4E] text-base leading-tight truncate mb-1">
              Dr. {doctor.name}
            </h3>
            <DoctorRating average={average} count={count} size="lg" />
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="inline-flex items-center gap-1 bg-white border border-[#D6E6F2] text-[#1A6FA8] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                <Stethoscope size={9} />
                {doctor.specialization}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 py-4 flex flex-col flex-1">
        {/* Score bar */}
        {doctor.recommendationScore && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                Match Score
              </span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#1A6FA8]">
                  {Math.min(doctor.recommendationScore, 100)}%
                </span>
                <div className="group relative">
                  <Info
                    size={11}
                    className="cursor-pointer text-[#8AAEC8] hover:text-[#1A6FA8] transition"
                  />
                  <div className="absolute z-50 hidden group-hover:block bottom-full right-0 mb-2 w-52 p-3 bg-white border border-[#D6E6F2] rounded-xl shadow-[0_8px_24px_rgba(26,111,168,0.12)] text-xs">
                    <p className="font-bold text-[#0D2E4E] mb-1">Match Score</p>
                    <p className="text-[#6B839A] leading-relaxed">
                      Calculated using experience, ratings, reviews,
                      consultation fee, and verification status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1.5 bg-[#EEF5FC] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] transition-all duration-700"
                style={{
                  width: `${Math.min(doctor.recommendationScore, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Info pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-1.5">
            <Briefcase size={11} className="text-[#1A6FA8] flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#0D2E4E]">
              {doctor.experienceYears} yrs exp
            </span>
          </div>

          {doctor.consultationFee && (
            <div className="flex items-center gap-1.5 bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-1.5">
              <Banknote size={11} className="text-[#38B2A0] flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#0D2E4E]">
                Rs. {doctor.consultationFee}
              </span>
            </div>
          )}

          {doctor.hospitalName && (
            <div className="flex items-center gap-1.5 bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-medium text-[#6B839A] truncate max-w-[120px]">
                {doctor.hospitalName}
              </span>
            </div>
          )}
        </div>

        {/* Bio */}
        {doctor.bio && (
          <p className="text-xs text-[#8AAEC8] leading-relaxed line-clamp-2 flex-1 mb-4">
            {doctor.bio}
          </p>
        )}

        {/* View Profile button */}
        <button
          onClick={() => navigate(`/doctors/${doctor.id}`)}
          className="w-full h-10 rounded-xl bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(26,111,168,0.25)] hover:shadow-[0_6px_20px_rgba(26,111,168,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
        >
          View Profile
          <ArrowRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
