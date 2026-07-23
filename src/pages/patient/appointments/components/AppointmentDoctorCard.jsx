import { Briefcase, ShieldCheck, Banknote, MapPin } from "lucide-react";

const AppointmentDoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
      {/* Gradient header */}
      <div className="h-16 bg-gradient-to-r from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] relative">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white opacity-5" />
        <div className="absolute top-3 left-5">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[2px]">
            Booking Appointment With
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-8 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.avatar || "/avatar-placeholder.png"}
              alt={doctor.name}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-[0_4px_12px_rgba(26,111,168,0.20)]"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="mb-1 flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-green-500" />
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">
              PMDC Verified
            </span>
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#0D2E4E] mb-2">
          Dr. {doctor.name}
        </h2>

        <div className="flex flex-wrap gap-2 mb-4">
          {doctor.specialization && (
            <span className="bg-[#E8F4FD] text-[#1A6FA8] text-[11px] font-semibold px-3 py-1 rounded-full">
              {doctor.specialization}
            </span>
          )}
          {doctor.qualification && (
            <span className="bg-[#F0F4F8] text-[#4A6680] text-[11px] font-medium px-3 py-1 rounded-full">
              {doctor.qualification}
            </span>
          )}
          {doctor.experienceYears && (
            <span className="flex items-center gap-1 bg-[#F0F4F8] text-[#4A6680] text-[11px] font-medium px-3 py-1 rounded-full">
              <Briefcase size={10} />
              {doctor.experienceYears} yrs exp
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent mb-4" />

        {/* Fee + Location row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E8F4FD] flex items-center justify-center flex-shrink-0">
              <Banknote size={13} className="text-[#1A6FA8]" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-[#4A6680] uppercase tracking-wide">
                Fee
              </p>
              <p className="text-xs font-bold text-[#0D2E4E]">
                {doctor.consultationFee
                  ? `PKR ${doctor.consultationFee}`
                  : "Not set"}
              </p>
            </div>
          </div>

          {doctor.hospitalName && (
            <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-2.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F4FD] flex items-center justify-center flex-shrink-0">
                <MapPin size={13} className="text-[#1A6FA8]" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#4A6680] uppercase tracking-wide">
                  Clinic
                </p>
                <p className="text-xs font-bold text-[#0D2E4E] line-clamp-1">
                  {doctor.hospitalName}
                </p>
              </div>
            </div>
          )}
        </div>

        {doctor.bio && (
          <p className="text-xs text-[#8AAEC8] leading-relaxed mt-3 line-clamp-2 border-t border-[#EEF5FC] pt-3">
            {doctor.bio}
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentDoctorCard;
