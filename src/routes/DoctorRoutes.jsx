import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import ApprovedSuccess from "../pages/doctor/pages/ApprovedSuccess";
import DoctorRedirect from "../pages/doctor/pages/DoctorRedirect";
import PendingApproval from "../pages/Auth/PendingApproval";
import CompleteProfile from "../pages/doctor/pages/CompleteProfile/CompleteProfile";
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
    path: "/doctor/approved",
    element: <ApprovedSuccess />,
  },
  {
    path: "/doctor/dashboard",
    element: <DoctorDashboard />,
  },
  {
    path: "/doctor/complete-profile",
    element: <CompleteProfile />,
  },
];
