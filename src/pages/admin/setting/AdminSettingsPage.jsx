import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import ProfilePanel from "./components/ProfilePanel";

import SecurityPanel from "./components/SecurityPanel";
const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "General" },

    { id: "security", label: "Login & Security" },
  ];

  const renderPanel = () => {
    if (activeTab === "profile") return <ProfilePanel />;

    if (activeTab === "security") return <SecurityPanel />;
  };

  return (
    <DashboardLayout role="admin">
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <div className="bg-gray-50 border-r p-6 space-y-2">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Settings
              </h2>

              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition text-sm ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 bg-white">{renderPanel()}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default AdminSettingsPage;
