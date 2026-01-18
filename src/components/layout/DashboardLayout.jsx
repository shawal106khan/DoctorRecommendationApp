import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import { useAuth } from "../../context/useAuth";

import Topbar from "./Topbar";
import logo from "../../assets/logo.png";

const DashboardLayout = ({ children, role, onSearchDoctorClick }) => {
  const { user } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Topbar
        logoSrc={logo}
        title="Medical"
        userName={user?.name}
        userImage={user?.avatar}
        role={user?.role}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex min-h-screen">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSearchDoctorClick={onSearchDoctorClick}
        />

        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
