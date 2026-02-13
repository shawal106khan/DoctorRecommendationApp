import { useMemo, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Modal from "../../../../components/common/components/Modal";
import { useAuth } from "../../../../context/useAuth";
import {
  getAppointmentsByDoctor,
  updateAppointmentStatus,
} from "../../../../store/appointmentStore";
import AppointmentTimeline from "../../../../components/common/appointments/AppointmentTimeline";
import { statusColor } from "../../../../utils/statusColors";

const DoctorAppointments = () => {
  const { user } = useAuth();
  const doctorId = user?.email;

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = useMemo(() => {
    if (!doctorId) return [];
    return getAppointmentsByDoctor(doctorId);
  }, [doctorId]);

  const closeModal = () => setSelectedAppointment(null);

  const handleStatusChange = (id, status) => {
    updateAppointmentStatus(id, status);
    closeModal();
  };

  return (
    <DashboardLayout role="doctor">
      <div className="p-6 space-y-4 font-serif">
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-400 rounded-sm
         p-5 text-white shadow shadow-blue-600 mb-6"
        >
          <h1 className="text-xl font-semibold">Appointments</h1>
        </div>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments yet.</p>
        ) : (
          appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white p-7 rounded-sm shadow flex justify-between items-center "
            >
              <div className="pl-8">
                <p className="font-medium">{a.patientName}</p>
                <p className="text-sm text-gray-500">
                  {a.date} · {a.time}
                </p>
              </div>

              <div className="flex items-center gap-5 pr-8">
                <span
                  className={`capitalize font-medium ${statusColor(a.status)}`}
                >
                  {a.status}
                </span>

                <button
                  onClick={() => setSelectedAppointment(a)}
                  className="text-sm px-7 py-2 rounded border bg-blue-600 text-white
                    hover:bg-blue-700 active:scale-95 transition"
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <Modal
        isOpen={!!selectedAppointment}
        onClose={closeModal}
        title="Appointment Details"
      >
        {selectedAppointment && (
          <div className="space-y-3 text-sm">
            <p>
              <strong>Patient:</strong> {selectedAppointment.patientName}
            </p>
            <p>
              <strong>Email:</strong> {selectedAppointment.patientEmail}
            </p>
            <p>
              <strong>Date:</strong> {selectedAppointment.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedAppointment.time}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{selectedAppointment.status}</span>
            </p>

            {selectedAppointment.note && (
              <p>
                <strong>Note:</strong> {selectedAppointment.note}
              </p>
            )}

            <AppointmentTimeline
              timeline={selectedAppointment.timeline || []}
            />

            {/* ACTIONS */}
            {selectedAppointment.status === "pending" && (
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() =>
                    handleStatusChange(selectedAppointment.id, "accepted")
                  }
                  className="flex-1 bg-green-600 text-white py-2 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(selectedAppointment.id, "rejected")
                  }
                  className="flex-1 bg-red-600 text-white py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}

            {selectedAppointment.status === "accepted" && (
              <div className="pt-4">
                <button
                  onClick={() =>
                    handleStatusChange(selectedAppointment.id, "completed")
                  }
                  className="w-full bg-blue-600 text-white py-2 rounded"
                >
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default DoctorAppointments;
