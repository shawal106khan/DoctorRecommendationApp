import { useState } from "react";
import DoctorProfileView from "./DoctorProfileView";
import DoctorProfileEdit from "./DoctorProfileEdit";

const DoctorProfilePage = () => {
  const [mode, setMode] = useState("view"); // "view" | "edit"

  return (
    <div className="p-6">
      {mode === "view" ? (
        <DoctorProfileView onEdit={() => setMode("edit")} />
      ) : (
        <DoctorProfileEdit onCancel={() => setMode("view")} />
      )}
    </div>
  );
};

export default DoctorProfilePage;
