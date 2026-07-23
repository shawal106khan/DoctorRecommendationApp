import { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "../../context/useAuth";
import Topbar from "./Topbar";
import logo from "../../assets/logo.png";
import ReviewForm from "../common/ratings/ReviewForm";
import Modal from "../common/components/Modal";
import { fetchAppointmentsForPatient } from "../../services/appointmentService";
import { getUserData, getPatientByUserId } from "../../services/userService";
const DashboardLayout = ({ children, role, onSearchDoctorClick }) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reviewAppointment, setReviewAppointment] = useState(null);

  const reviewAppointmentRef = useRef(null);

  const previousStatusesRef = useRef({});
  const getUserImage = () => user?.avatar || "";
  useEffect(() => {
    if (role !== "patient") return;

    let pollInterval = null;
    let patientId = null;

    const load = async () => {
      try {
        const { userId } = await getUserData();

        const patient = await getPatientByUserId(userId);

        if (!patient) return;

        patientId = patient.patients_id;

        const data = await fetchAppointmentsForPatient(patientId);

        data.forEach((a) => {
          previousStatusesRef.current[a.appointment_id] = a.status;
        });

        pollInterval = setInterval(async () => {
          try {
            const updated = await fetchAppointmentsForPatient(patientId);

            for (const a of updated) {
              // const prevStatus = previousStatusesRef.current[a.appointment_id];

              // const wasNotCompleted = prevStatus && prevStatus !== "completed";

              // const isNowCompleted = a.status === "completed";

              // const hasNoReview = !a.reviews?.[0];

              // if (wasNotCompleted && isNowCompleted && hasNoReview) {
              const hasNoReview = !a.reviews?.[0];

              const shouldAskReview = a.status === "completed" && hasNoReview;

              if (shouldAskReview) {
                reviewAppointmentRef.current = a;

                setReviewAppointment({ ...a });

                break;
              }

              previousStatusesRef.current[a.appointment_id] = a.status;
            }
          } catch (err) {
            console.error(err);
          }
        }, 10000);
      } catch (err) {
        console.error(err);
      }
    };

    load();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [role]);
  return (
    <>
      <Topbar
        logoSrc={logo}
        userName={user?.name}
        userImage={getUserImage()}
        role={user?.role}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex min-h-screen bg-[#F0F4F8]">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSearchDoctorClick={onSearchDoctorClick}
        />
        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
      {role === "patient" && (
        <Modal
          isOpen={!!reviewAppointment}
          onClose={() => {
            setReviewAppointment(null);
            reviewAppointmentRef.current = null;
          }}
          title="Leave a Review"
        >
          {reviewAppointment && (
            <ReviewForm
              appointment={reviewAppointment}
              onDone={() => {
                setReviewAppointment(null);
                reviewAppointmentRef.current = null;
              }}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default DashboardLayout;
