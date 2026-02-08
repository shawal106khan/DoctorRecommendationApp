import { useMemo, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useAuth } from "../../../context/useAuth";
import { getAppointmentsByPatient } from "../../../store/appointmentStore";
import { getDoctorById } from "../../../store/doctorStore";
import AppointmentTimeline from "../../../components/common/appointments/AppointmentTimeline";
import { statusColor } from "../../../utils/statusColors";
import ReviewForm from "../../../components/common/ratings/ReviewForm";
import Modal from "../../../components/common/components/Modal";
const PatientAppointments = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [reviewAppointment, setReviewAppointment] = useState(null);

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
                  {a.status === "completed" && !a.review && (
                    <button
                      onClick={() => setReviewAppointment(a)}
                      className="mt-2 px-3 py-1 text-xs rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Write Review
                    </button>
                  )}

                  {a.review && (
                    <p className="mt-2 text-xs text-green-600">
                      ⭐ {a.review.rating} — Review submitted
                    </p>
                  )}
                </span>
              </div>
            );
          })
        )}
      </div>
      <Modal
        isOpen={!!reviewAppointment}
        onClose={() => setReviewAppointment(null)}
        title="Leave a Review"
      >
        {reviewAppointment && (
          <ReviewForm
            appointment={reviewAppointment}
            onDone={() => setReviewAppointment(null)}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default PatientAppointments;
