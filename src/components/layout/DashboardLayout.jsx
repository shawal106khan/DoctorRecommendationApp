import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";

import Topbar from "./Topbar";
import logo from "../../assets/logo.png";
import profilePic from "../../assets/profile-pictur.png";

const DashboardLayout = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Topbar
        logoSrc={logo}
        title="Medical"
        userName="Kiran"
        userImage={profilePic}
        role={role}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex min-h-screen">
        <Sidebar
          role={role}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
