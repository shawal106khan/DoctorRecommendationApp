import DashboardLayout from "../../../components/layout/DashboardLayout";
import ProfilePanel from "../setting/components/ProfilePanel";

const AdminProfilePage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Manage your personal information and avatar
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8 max-w-2xl mx-auto">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">My Profile</h1>
            </div>
          </div>

          {/* Profile Panel */}
          <ProfilePanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminProfilePage;
