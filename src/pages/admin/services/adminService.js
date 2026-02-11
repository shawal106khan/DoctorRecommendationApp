// 🔹 TEMP: localStorage simulation (replace with API later)
import { getDoctors } from "../../../store/doctorStore";

// 👉 MAIN FUNCTION used by AdminDashboard
export const getAdminStats = async () => {
  // Later this will be:
  // const res = await fetch("/api/admin/stats");
  // return await res.json();

  const doctors = getDoctors();

  const approvedDoctors = doctors.filter((d) => d.status === "approved").length;
  const rejectedDoctors = doctors.filter((d) => d.status === "rejected").length;
  const pendingDoctors = doctors.filter(
    (d) => !d.status || d.status === "pending",
  ).length;

  return {
    totalDoctors: doctors.length,
    approvedDoctors,
    pendingDoctors,
    rejectedDoctors,
    patients: 0, // backend later
    appointments: 0, // backend later

    // charts
    // data (backend later)

    doctorStatusData: [
      { label: "Accepted", value: approvedDoctors },
      { label: "Pending Requests", value: pendingDoctors },
      { label: "Rejected", value: rejectedDoctors },
    ],

    appointmentsTrend: [2, 5, 3, 6, 8, 4, 7],

    recentDoctors: doctors.slice(-5).reverse(),
  };
};
