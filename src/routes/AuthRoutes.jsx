import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DoctorDetailsPage from "../pages/Auth/DoctorDetailsPage";
import DoctorVerification from "../pages/Auth/DoctorVerification";
import PendingApproval from "../pages/Auth/PendingApproval";
import SignupSuccess from "../pages/Auth/SignupSuccess";

export const authRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signup/doctor-info", element: <DoctorDetailsPage /> },
  { path: "/signup/doctor-verification", element: <DoctorVerification /> },
  { path: "/pending-approval", element: <PendingApproval /> },
  { path: "/signup/success", element: <SignupSuccess /> },
];
export default authRoutes;
