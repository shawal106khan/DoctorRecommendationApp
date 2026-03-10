import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "./components/StatsCard";
import { getAdminStats } from "./services/adminService";
import DoctorStatusCircle from "./components/DoctorStatusCircle";
import toast from "react-hot-toast";
import { getDoctors } from "../../store/doctorStore";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };

    loadStats();
  }, []);
  // ✅ Notification for new doctor registration
  useEffect(() => {
    const doctors = getDoctors();

    const pendingDoctors = doctors.filter(
      (doc) =>
        // pending if not approved yet or status pending
        (doc.status === "pending" || doc.isApproved === false) &&
        // only notify if not already notified
        !doc.approvalNotified,
    );

    pendingDoctors.forEach((doc) => {
      toast.success(`New doctor registered: ${doc.name} pending approval`);

      // mark as notified so it won't repeat
      doc.approvalNotified = true;
    });

    // save back updated doctors with approvalNotified
    localStorage.setItem("verified_doctors", JSON.stringify(doctors));
  }, []);

  if (!stats) return null;

  const cards = [
    { label: "Total Doctors", value: stats.totalDoctors },
    { label: "Accepted", value: stats.approvedDoctors },
    { label: "Pending Requests", value: stats.pendingDoctors },
    { label: "Rejected", value: stats.rejectedDoctors },
  ];
  const PatientCard = [
    { label: "Total Patients", value: stats.patients },
    { label: "Appointment Completed", value: stats.appointments },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-400  px-6 py-4 text-white mb-5">
        <h1 className="text-xl font-semibold  font-serif ">Admin Dashboard</h1>
      </div>
      <div>
        <p
          className="font-serif  mx-3 my-2 text-base text-blue-800 
           bg-gray-100 p-4 inline-block rounded-md font-semibold"
        >
          Doctor's Overview
        </p>
        <div className="flex flex-col lg:flex-row gap-6 mx-4 my-5">
          {/* LEFT → Stat cards */}

          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 gap-5 font-serif ">
            {cards.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
              />
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

        <div>
          <p
            className="font-serif  mx-3 my-2 text-base text-blue-800 
           bg-gray-100 p-4 inline-block rounded-md font-semibold"
          >
            Patient and Appointment Overview
          </p>
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-2 gap-5 font-serif mx-3 mt-4 mb-8 ">
            {PatientCard.map((card) => (
              <StatCard
                key={card.label}
                label={card.label}
                value={card.value}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
