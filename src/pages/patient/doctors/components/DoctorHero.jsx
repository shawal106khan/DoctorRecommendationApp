import DoctorRating from "../../../../components/common/ratings/DoctorRating";
import { ShieldCheck, Briefcase } from "lucide-react";

const DoctorHero = ({ doctor, average, count }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
      {/* Top gradient banner */}
      <div className="h-20 bg-gradient-to-r from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] relative">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full bg-[#38B2A0] opacity-10 blur-xl" />
      </div>

      <div className="px-6 pb-6">
        {/* Avatar overlapping banner */}
        <div className="flex items-end gap-5 -mt-10 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-[0_4px_16px_rgba(26,111,168,0.20)]"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="mb-1">
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-green-500" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">
                PMDC Verified
              </span>
            </div>
          </div>
        </div>

        {/* Info */}
        <h1 className="text-xl font-bold text-[#0D2E4E] mb-1">
          Dr. {doctor.name}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#E8F4FD] text-[#1A6FA8] text-[11px] font-semibold px-3 py-1 rounded-full">
            {doctor.specialization}
          </span>
          {doctor.qualification && (
            <span className="bg-[#F0F4F8] text-[#4A6680] text-[11px] font-medium px-3 py-1 rounded-full">
              {doctor.qualification}
            </span>
          )}
          <span className="flex items-center gap-1 bg-[#F0F4F8] text-[#4A6680] text-[11px] font-medium px-3 py-1 rounded-full">
            <Briefcase size={10} />
            {doctor.experienceYears} yrs exp
          </span>
        </div>

        <DoctorRating average={average} count={count} size="sm" />

        {doctor.bio && (
          <p className="text-sm text-[#6B839A] leading-relaxed mt-3 border-t border-[#EEF5FC] pt-3">
            {doctor.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorHero;
