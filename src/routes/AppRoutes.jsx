import { Routes, Route } from "react-router-dom";

// Auth pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DoctorDetailsPage from "../pages/Auth/DoctorDetailsPage";
import DoctorVerification from "../pages/Auth/DoctorVerification";
import PendingApproval from "../pages/Auth/PendingApproval";
import SignupSuccess from "../pages/Auth/SignupSuccess";

// Patient pages
import PatientDashboard from "../pages/patient/PatientDashboard";
import Profile from "../pages/patient/Profile";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup/doctor-info" element={<DoctorDetailsPage />} />
      <Route
        path="/signup/doctor-verification"
        element={<DoctorVerification />}
      />
      <Route path="/pending-approval" element={<PendingApproval />} />
      <Route path="/signup/success" element={<SignupSuccess />} />

      {/* Patient routes */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute role="patient">
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
