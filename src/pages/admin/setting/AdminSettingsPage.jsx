import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import GeneralPanel from "./components/GeneralPanel";
import ProfilePanel from "./components/ProfilePanel";
import SecurityPanel from "./components/SecurityPanel";
import { Settings, User, Shield, Globe } from "lucide-react";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Login & Security", icon: Shield },
  ];

  const renderPanel = () => {
    if (activeTab === "general") return <GeneralPanel />;
    if (activeTab === "profile") return <ProfilePanel />;
    if (activeTab === "security") return <SecurityPanel />;
  };

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">Settings</h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
            <div className="grid md:grid-cols-[220px_1fr]">
              {/* Sidebar */}
              <div className="bg-[#F7FAFE] border-b md:border-b-0 md:border-r border-[#D6E6F2] p-3 sm:p-5 md:space-y-1">
                <div className="hidden md:flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center">
                    <Settings size={14} className="text-white" />
                  </div>
                  <p className="text-sm font-bold text-[#0D2E4E]">Settings</p>
                </div>

                <div className="flex md:block gap-2 overflow-x-auto md:overflow-visible">
                  {tabs.map(({ id, label, icon }) => {
                    const Icon = icon;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex-shrink-0 md:w-full text-left px-4 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2.5 font-medium whitespace-nowrap ${
                          activeTab === id
                            ? "bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white shadow-[0_4px_12px_rgba(26,111,168,0.25)]"
                            : "text-[#4A6680] hover:bg-[#E8F4FD] hover:text-[#1A6FA8]"
                        }`}
                      >
                        <Icon size={15} />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-8 bg-white">{renderPanel()}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;
