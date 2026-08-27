import { useState } from "react";
import DoctorProfileView from "./DoctorProfileView";
import DoctorProfileEdit from "./DoctorProfileEdit";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const DoctorProfilePage = () => {
  const [mode, setMode] = useState("view");

  return (
    <DashboardLayout role="doctor">
      <div className="bg-[#F0F4F8] min-h-screen">
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            {mode === "view"
              ? "View your doctor profile"
              : "Edit your profile information"}
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Doctor Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                {mode === "view" ? "My Profile" : "Edit Profile"}
              </h1>
            </div>
          </div>

          {mode === "view" ? (
            <DoctorProfileView onEdit={() => setMode("edit")} />
          ) : (
            <DoctorProfileEdit onCancel={() => setMode("view")} />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfilePage;
