import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDoctors from "../pages/admin/AdminDoctors";
import AdminAppointments from "../pages/admin/appointments/AdminAppointments";
import AdminHealthAssistant from "../pages/admin/Assistant/AdminHealthAssistant";
import AdminComplaintsPage from "../pages/admin/complaints/AdminComplaintsPage";
import AdminDiseaseManagement from "../pages/admin/disease/AdminDiseaseManagement";
import AdminPatients from "../pages/admin/patient/AdminPatients";
import AdminProfilePage from "../pages/admin/profile/AdminProfilePage";
import AdminMonthlyReportPage from "../pages/admin/report/AdminMonthlyReportPage";
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
    {
      path: "/admin/disease-management",
      element: (
        <ProtectedRoute role="admin">
          <AdminDiseaseManagement />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/complaints",
      element: (
        <ProtectedRoute role="admin">
          <AdminComplaintsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/health-assistant",
      element: (
        <ProtectedRoute role="admin">
          <AdminHealthAssistant />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/monthly-reports",
      element: (
        <ProtectedRoute role="admin">
          <AdminMonthlyReportPage />
        </ProtectedRoute>
      ),
    },
  ];
}
export default AdminRoutes;
