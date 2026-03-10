import { useState } from "react";
import DoctorProfileView from "./DoctorProfileView";
import DoctorProfileEdit from "./DoctorProfileEdit";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const DoctorProfilePage = () => {
  const [mode, setMode] = useState("view"); // "view" | "edit"

  return (
    <DashboardLayout role="doctor">
      <div className="p-6">
        {mode === "view" ? (
          <DoctorProfileView onEdit={() => setMode("edit")} />
        ) : (
          <DoctorProfileEdit onCancel={() => setMode("view")} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfilePage;
