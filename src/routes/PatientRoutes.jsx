import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../pages/patient/PatientDashboard";
import DoctorProfile from "../pages/shared/doctor/DoctorProfile";
import PatientProfile from "../pages/patient/profile/PatientProfile";

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
    element: (
      <ProtectedRoute role="patient">
        <DoctorProfile />
      </ProtectedRoute>
    ),
  },
];
export default patientRoutes;
