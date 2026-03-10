import DashboardLayout from "../../../components/layout/DashboardLayout";
import ProfilePanel from "../setting/components/ProfilePanel";

const AdminProfilePage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="min-h-screen bg-gray-50 p-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and avatar
          </p>
        </div>

        {/* Profile Panel */}
        <ProfilePanel />
      </div>
    </DashboardLayout>
  );
};

export default AdminProfilePage;
