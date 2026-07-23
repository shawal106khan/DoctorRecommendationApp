import { formatTime } from "../../../../utils/formatTime";
import { Clock } from "lucide-react";

const DoctorAvailability = ({ doctor }) => {
  const profile = doctor.profile || {};

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
        <h2 className="text-base font-bold text-[#0D2E4E]">Availability</h2>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
          <Clock size={14} className="text-green-500" />
        </div>
        <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
          Available Days & Timing
        </p>
      </div>

      <div className="space-y-2.5">
        {profile.availableDays?.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-2.5"
          >
            <span className="text-sm font-bold text-[#1A6FA8]">{day}</span>
            <span className="text-xs font-medium text-[#4A6680] bg-white border border-[#D6E6F2] px-3 py-1 rounded-full">
              {formatTime(profile.startTime)} – {formatTime(profile.endTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAvailability;
