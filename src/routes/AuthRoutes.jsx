import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DoctorDetailsPage from "../pages/Auth/DoctorDetailsPage";
import DoctorVerification from "../pages/Auth/DoctorVerification";
import PendingApproval from "../pages/Auth/PendingApproval";
import SignupSuccess from "../pages/Auth/SignupSuccess";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import EmailSent from "../pages/Auth/ForgotPassword/EmailSent";
import ResetPassword from "../pages/Auth/ForgotPassword/ResetPassword";
import Home from "../pages/home/Home";
export const authRoutes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/signup/doctor-info", element: <DoctorDetailsPage /> },
  { path: "/signup/doctor-verification", element: <DoctorVerification /> },
  { path: "/pending-approval", element: <PendingApproval /> },
  { path: "/signup/success", element: <SignupSuccess /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/email-sent", element: <EmailSent /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
];
export default authRoutes;
