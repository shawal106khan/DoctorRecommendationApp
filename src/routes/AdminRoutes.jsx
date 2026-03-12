import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminAppointments from "../pages/admin/appointments/AdminAppointments";
import AdminPatients from "../pages/admin/patient/AdminPatients";
import AdminProfilePage from "../pages/admin/profile/AdminProfilePage";
import AdminSettingsPage from "../pages/admin/setting/AdminSettingsPage";
import ProtectedRoute from "./ProtectedRoute";
function AdminRoutes() {
  return [
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/doctors",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminDoctors />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/patients",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminPatients />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/appointments",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminAppointments />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/settings",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminSettingsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/profile",
      element: (
        <ProtectedRoute role="admin" loginPath="/admin/login">
          <AdminProfilePage />
        </ProtectedRoute>
      ),
    },
  ];
}
export default AdminRoutes;
