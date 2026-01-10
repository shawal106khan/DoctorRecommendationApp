import { Routes, Route } from "react-router-dom";
// Auth pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DoctorDetailsPage from "../pages/Auth/DoctorDetailsPage";
// portals placeholder
import PatientPortal from "../pages/patient/PatientPortal";
import DoctorPortal from "../pages/doctor/DoctorPortal";
import AdminPortal from "../pages/admin/AdminPortal";
import DoctorVerification from "../pages/Auth/DoctorVerification";
import PendingApproval from "../pages/Auth/PendingApproval";

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

        {/* Portal placeholders< */}
        <Route path="/patient" element={<PatientPortal />}></Route>
        <Route path="/doctor" element={<DoctorPortal />}></Route>
        <Route path="/admin" element={<AdminPortal />}></Route>
      </Routes>
    </>
  );
}
export default AppRoutes;
