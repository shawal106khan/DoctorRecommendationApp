import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "./components/StatsCard";
import { getAdminStats } from "./services/adminService";
import DoctorStatusCircle from "./components/DoctorStatusCircle";
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };

    loadStats();
  }, []);

  if (!stats) return null;

  const cards = [
    { label: "Total Doctors", value: stats.totalDoctors },
    { label: "Accepted", value: stats.approvedDoctors },
    { label: "Pending Requests", value: stats.pendingDoctors },
    { label: "Rejected", value: stats.rejectedDoctors },
    // { label: "Patients", value: stats.patients },
    // { label: "Completed", value: stats.appointments },
  ];

  return (
    <DashboardLayout role="admin">
      <h1 className="text-2xl font-semibold m-6 font-serif">Admin Dashboard</h1>
      <p className="font-serif text-sm mx-6 mb-2 text-blue-600">
        Overview of a Doctors and Patients
      </p>
      <div className="flex flex-col lg:flex-row gap-6 mx-4">
        {/* LEFT → Stat cards */}
        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 gap-4 font-serif">
          {cards.map((card) => (
            <StatCard key={card.label} label={card.label} value={card.value} />
          ))}
        </div>

        {/* RIGHT → Doctor status circle */}
        <div className="lg:w-80 ">
          <DoctorStatusCircle
            data={stats.doctorStatusData}
            total={stats.totalDoctors}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
