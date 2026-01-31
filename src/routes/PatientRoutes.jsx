import ProtectedRoute from "./ProtectedRoute";
import PatientDashboard from "../pages/patient/PatientDashboard";

import PatientProfile from "../pages/patient/profile/PatientProfile";
import DoctorProfilePublic from "../pages/patient/doctors/DoctorProfilePublic";

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
        <DoctorProfilePublic />
      </ProtectedRoute>
    ),
  },
];
export default patientRoutes;
