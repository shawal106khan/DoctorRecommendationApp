import ApprovedSuccess from "../pages/doctor/pages/ApprovedSuccess";
import DoctorRedirect from "../pages/doctor/pages/DoctorRedirect";
import PendingApproval from "../pages/Auth/PendingApproval";
import CompleteProfile from "../pages/doctor/pages/CompleteProfile/CompleteProfile";
import DoctorDashboard from "../pages/doctor/pages/Dashboard/DoctorDashboard";
import DoctorProfile from "../pages/doctor/pages/profile/DoctorProfilePage";
import DoctorAppointments from "../pages/doctor/pages/appointments/DoctorAppointments";

import DoctorReviewsPage from "../pages/doctor/pages/reviews/DoctorReviewsPage";
import RejectedPage from "../pages/doctor/pages/DoctorRejected";
export const doctorRoutes = [
  {
    path: "/doctor/redirect",
    element: <DoctorRedirect />,
  },
  {
    path: "/doctor/pending-approval",
    element: <PendingApproval />,
  },
  {
    path: "/doctor/approvedSuccess",
    element: <ApprovedSuccess />,
  },
  {
    path: "/doctor/rejected",
    element: <RejectedPage />,
  },
  {
    path: "/doctor/dashboard",
    element: <DoctorDashboard />,
  },
  {
    path: "/doctor/complete-profile",
    element: <CompleteProfile />,
  },
  {
    path: "/doctor/profile",
    element: <DoctorProfile />,
  },
  {
    path: "/doctor/appointments",
    element: <DoctorAppointments />,
  },
  {
    path: "/doctor/reviews",
    element: <DoctorReviewsPage />,
  },
];
