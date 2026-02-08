import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import StatCard from "./components/StatCard";
import AppointmentCard from "./components/AppointmentCard";
import { getAppointmentsByDoctor } from "../../../../store/appointmentStore";
import AppointmentCircle from "./components/AppointmentCircle";

const DoctorHome = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() => {
    if (!user?.email) return [];
    return getAppointmentsByDoctor(user.email);
  });

  const handleStatusChange = (id, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a)),
    );
  };

  const totalAppointments = appointments.length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const accepted = appointments.filter(
    (a) => a.status === "accepted" || a.status === "completed",
  ).length;
  const completed = appointments.filter((a) => a.status === "completed").length;
  const stats = [
    { label: "Total Appointments", value: totalAppointments },
    { label: "Pending Requests", value: pending },
    { label: "Accepted", value: accepted },
    { label: "Completed", value: completed },
  ];

  return (
    <div className="p-6 space-y-8 font-serif">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-blue-900 font-mono">
          Welcome back Dr. {user?.name}
        </h1>
        <p className="text-sm text-gray-500">
          Here’s an overview of your activity today
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div>
          <AppointmentCircle data={stats} total={totalAppointments} />
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white   ">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Today’s Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No appointments scheduled.
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt) => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorHome;
