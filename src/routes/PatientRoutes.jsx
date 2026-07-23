import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientProfile from "../pages/patient/profile/PatientProfile";
import DoctorProfilePublic from "../pages/patient/doctors/DoctorProfilePublic";
import BookAppointmentPage from "../pages/patient/appointments/BookAppointmentPage";
import PatientAppointments from "../pages/patient/appointments/PatientAppointments";
import QueueStatusPage from "../pages/patient/queue/QueueStatusPage";

export const patientRoutes = [
  {
    path: "/patient/dashboard",
    element: (
      <ProtectedRoute role="patient">
        <PatientDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patient/profile",
    element: (
      <ProtectedRoute role="patient">
        <PatientProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctors/:doctorId",
    element: <DoctorProfilePublic />, // ✅ public — no protection
  },
  {
    path: "/patient/appointments/book/:doctorId",
    element: (
      <ProtectedRoute role="patient">
        <BookAppointmentPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patient/appointments",
    element: (
      <ProtectedRoute role="patient">
        <PatientAppointments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patient/queue",
    element: (
      <ProtectedRoute role="patient">
        <QueueStatusPage />
      </ProtectedRoute>
    ),
  },
];

export default patientRoutes;
