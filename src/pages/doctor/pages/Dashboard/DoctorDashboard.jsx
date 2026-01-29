import DashboardLayout from "../../../../components/layout/DashboardLayout";
import DoctorHome from "./DoctorHome";

const DoctorDashboard = () => {
  return (
    <DashboardLayout role="doctor">
      <DoctorHome />
    </DashboardLayout>
  );
};

export default DoctorDashboard;
