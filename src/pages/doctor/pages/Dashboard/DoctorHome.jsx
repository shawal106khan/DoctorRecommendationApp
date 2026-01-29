import { useAuth } from "../../../../context/useAuth";
import StatCard from "./components/StatCard";
import AppointmentCard from "./components/AppointmentCard";

const DoctorHome = () => {
  const { user } = useAuth();

  // 🔹 TEMP FRONTEND DATA (BACKEND READY)
  const stats = [
    { label: "Today Appointments", value: 5 },
    { label: "Total Patients", value: 124 },
    { label: "Rating", value: "4.8 ★" },
  ];

  const appointments = []; // empty state for now

  return (
    <div className="p-6 space-y-8 font-serif">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, Dr. {user?.name}
        </h1>
        <p className="text-sm text-gray-500">
          Here’s an overview of your activity today
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* APPOINTMENTS */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Today’s Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No appointments scheduled for today.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;
