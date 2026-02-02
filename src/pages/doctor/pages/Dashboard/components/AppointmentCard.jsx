import { useState } from "react";
import { updateAppointmentStatus } from "../../../../../store/appointmentStore";
import { statusColor } from "../../../../../utils/statusColors";
const formatTime = (time) => {
  const [h, m] = time.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formatted = hour % 12 || 12;
  return `${formatted}:${m} ${ampm}`;
};

const AppointmentCard = ({ appointment, onStatusChange }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = (status) => {
    setLoading(true);

    updateAppointmentStatus(appointment.id, status);
    onStatusChange(appointment.id, status);

    setTimeout(() => setLoading(false), 300); // smooth UX
    console.log(`Appointment ${appointment.id} ${status}`);
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow p-4 flex justify-between items-center transition hover:shadow-md">
      <div>
        <h4 className="font-medium text-blue-700">{appointment.patientName}</h4>
        <p className="text-sm text-gray-500">
          {appointment.date} · {formatTime(appointment.time)}
        </p>
        <p className="text-xs capitalize text-gray-400">
          Status: {appointment.status}
        </p>
      </div>

      {appointment.status === "pending" ||
      appointment.status === "requested" ? (
        <div className="flex gap-2">
          <button
            disabled={loading}
            onClick={() => handleAction("accepted")}
            className="px-3 py-1 text-sm rounded bg-green-600 text-white
              hover:bg-green-700 active:scale-95 transition disabled:opacity-50"
          >
            {loading ? "..." : "Accept"}
          </button>

          <button
            disabled={loading}
            onClick={() => handleAction("rejected")}
            className="px-3 py-1 text-sm rounded bg-red-600 text-white
              hover:bg-red-700 active:scale-95 transition disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      ) : (
        <span
          className={`capitalize font-medium ${statusColor(appointment.status)}`}
        >
          {appointment.status}
        </span>
      )}
    </div>
  );
};

export default AppointmentCard;
