import { useState } from "react";
import { statusColor } from "../../../../../utils/statusColors";
import { formatDateTimeShort } from "../../../../../utils/formatDateTimeShort";
import { formatTime } from "../../../../../utils/formatTime";
import { User, MapPin, CalendarCheck, Clock, Hash } from "lucide-react";
import ButtonLoader from "../../../../../components/common/components/ButtonLoader";
const AppointmentCard = ({ appointment, onStatusChange }) => {
  const [loadingAction, setLoadingAction] = useState(null); // "approved" | "rejected" | null

  const handleAction = async (status) => {
    setLoadingAction(status);
    await onStatusChange(appointment.id, status);
    setTimeout(() => setLoadingAction(null), 300);
  };

  return (
    <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 hover:shadow-sm transition-all">
      <div className="flex-1 min-w-0">
        {/* Patient name */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {appointment.patientName?.[0]?.toUpperCase() || "P"}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#0D2E4E]">
              {appointment.patientName}
            </p>
            <div
              className={`inline-flex text-[10px] font-bold capitalize px-2 py-0.5 rounded-full ${statusColor(appointment.status)}`}
            >
              {appointment.status}
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1.5">
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
            <User size={9} className="text-[#1A6FA8]" />
            Age:{" "}
            <strong className="text-[#0D2E4E] ml-0.5">
              {appointment.patientAge}
            </strong>
          </p>
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
            <User size={9} className="text-[#1A6FA8]" />
            Gender:{" "}
            <strong className="text-[#0D2E4E] ml-0.5 capitalize">
              {appointment.patientGender}
            </strong>
          </p>
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5 min-w-0">
            <MapPin size={9} className="text-[#1A6FA8] flex-shrink-0" />
            <strong className="text-[#0D2E4E] truncate">
              {appointment.patientAddress}
            </strong>
          </p>
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
            <CalendarCheck size={9} className="text-[#1A6FA8]" />
            <strong className="text-[#0D2E4E]">
              {appointment.selectedDay
                ? new Date(appointment.selectedDay).toLocaleDateString(
                    "en-US",
                    { weekday: "short", month: "short", day: "numeric" },
                  )
                : "-"}
            </strong>
          </p>
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
            <Hash size={9} className="text-[#1A6FA8]" />
            Queue:{" "}
            <strong className="text-[#0D2E4E] ml-0.5">
              {appointment.queueNumber}
            </strong>
          </p>
          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
            <Clock size={9} className="text-[#1A6FA8]" />
            <strong className="text-[#0D2E4E]">
              {appointment.time && appointment.time !== "Pending"
                ? formatTime(appointment.time)
                : "Pending"}
            </strong>
          </p>
        </div>
        <p className="text-[10px] text-[#8AAEC8] mt-1.5">
          {formatDateTimeShort(appointment.date)}
        </p>
      </div>

      {/* Actions */}

      <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
        {appointment.status === "pending" ? (
          <>
            <button
              disabled={loadingAction === "approved"}
              onClick={() => handleAction("approved")}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-xs font-bold rounded-xl bg-green-500 text-white hover:bg-green-600 active:scale-95 transition disabled:opacity-50"
            >
              {loadingAction === "approved" ? (
                <ButtonLoader text="Accepting..." />
              ) : (
                "Accept"
              )}
            </button>
            <button
              disabled={loadingAction !== null}
              onClick={() => handleAction("rejected")}
              className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-xs font-bold rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 active:scale-95 transition disabled:opacity-50"
            >
              {loadingAction === "rejected" ? (
                <ButtonLoader text="Rejecting..." />
              ) : (
                "Reject"
              )}
            </button>
          </>
        ) : (
          <div
            className={`text-xs font-bold capitalize px-3 py-1.5 rounded-full ${statusColor(appointment.status)}`}
          >
            {appointment.status}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
