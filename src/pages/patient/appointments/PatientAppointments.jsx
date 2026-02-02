import { useMemo } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useAuth } from "../../../context/useAuth";
import { getAppointmentsByPatient } from "../../../store/appointmentStore";
import { getDoctorById } from "../../../store/doctorStore";
import AppointmentTimeline from "../../../components/common/appointments/AppointmentTimeline";
import { statusColor } from "../../../utils/statusColors";
const PatientAppointments = () => {
  const { user } = useAuth();
  const email = user?.email;

  const appointments = useMemo(() => {
    if (!email) return [];
    return getAppointmentsByPatient(email);
  }, [email]);

  return (
    <DashboardLayout role="patient">
      <div className="p-6 space-y-4 font-serif">
        <h1 className="text-xl font-semibold text-blue-700">My Appointments</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments yet.</p>
        ) : (
          appointments.map((a) => {
            const doctor = getDoctorById(a.doctorId);

            return (
              <div
                key={a.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <p className=" font-medium text-blue-700">Date & Time</p>
                  <p className="font-medium">
                    {a.date} · {a.time}
                  </p>

                  <p className="text-sm text-gray-700">
                    Dr. {doctor?.name || "Unknown Doctor"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {doctor?.specialization}
                  </p>
                </div>

                <span
                  className={`capitalize font-medium ${statusColor(a.status)}`}
                >
                  {a.status}

                  {/* TimeLine */}
                  <AppointmentTimeline timeline={a.timeline} />
                </span>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientAppointments;
