import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
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
  ];
}
export default AdminRoutes;
