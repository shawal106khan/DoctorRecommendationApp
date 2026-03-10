import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminAppointments from "../pages/admin/appointments/AdminAppointments";
import AdminPatients from "../pages/admin/patient/AdminPatients";
import AdminProfilePage from "../pages/admin/profile/AdminProfilePage";
import AdminSettingsPage from "../pages/admin/setting/AdminSettingsPage";
function AdminRoutes() {
  return [
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/admin/doctors",
      element: <AdminDoctors />,
    },
    {
      path: "/admin/patients",
      element: <AdminPatients />,
    },
    { path: "/admin/appointments", element: <AdminAppointments /> },
    {
      path: "/admin/settings",
      element: <AdminSettingsPage />,
    },
    {
      path: "/admin/profile",
      element: <AdminProfilePage />,
    },
  ];
}
export default AdminRoutes;
