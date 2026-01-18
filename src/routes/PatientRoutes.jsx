import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../pages/patient/PatientDashboard";
import Profile from "../pages/patient/PatientProfile";
import DoctorProfile from "../pages/shared/doctor/DoctorProfile";

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
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/doctors/:doctorId",
    element: (
      <ProtectedRoute role="patient">
        <DoctorProfile />
      </ProtectedRoute>
    ),
  },
];
export default patientRoutes;
