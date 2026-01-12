import { Routes, Route } from "react-router-dom";
// Auth pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DoctorDetailsPage from "../pages/Auth/DoctorDetailsPage";
// portals placeholder

import DoctorVerification from "../pages/Auth/DoctorVerification";
import PendingApproval from "../pages/Auth/PendingApproval";
import SignupSuccess from "../pages/Auth/SignupSuccess";
import PatientDashboard from "../pages/patient/PatientDashboard";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route
          path="/signup/doctor-info"
          element={<DoctorDetailsPage />}
        ></Route>

        <Route
          path="/signup/doctor-verification"
          element={<DoctorVerification />}
        ></Route>

        <Route path="/pending-approval" element={<PendingApproval />} />
        <Route path="/signup/success" element={<SignupSuccess />}></Route>

        {/* Portal placeholders< */}
        <Route path="/patient/dashboard" element={<PatientDashboard />}></Route>
      </Routes>
    </>
  );
}
export default AppRoutes;
