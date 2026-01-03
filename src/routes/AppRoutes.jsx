import { Routes, Route } from "react-router-dom";
// Auth pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
// portals placeholder
import PatientPortal from "../pages/patient/PatientPortal";
import DoctorPortal from "../pages/doctor/DoctorPortal";
import AdminPortal from "../pages/admin/AdminPortal";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/sigunp" element={<SignupPage />}></Route>

        {/* Portal placeholders */}
        <Route path="/patient" element={<PatientPortal />}></Route>
        <Route path="/doctor" element={<DoctorPortal />}></Route>
        <Route path="/admin" element={<AdminPortal />}></Route>
      </Routes>
    </>
  );
}
export default AppRoutes;
