import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import StatCard from "./components/StatCard";
import AppointmentCard from "./components/AppointmentCard";
import { getAppointmentsByDoctor } from "../../../../store/appointmentStore";
import AppointmentCircle from "./components/AppointmentCircle";
import { Stethoscope } from "lucide-react";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

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
    <div className="p-8 space-y-10 font-serif bg-slate-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-400 rounded-sm p-8 text-white shadow shadow-blue-600 flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            {getGreeting()}, Dr. {user?.name}
            <Stethoscope size={30} className="text-white" />
          </h1>
          <p className="text-sm text-blue-100 mt-1">
            Here’s an overview of your activity today
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 xl:col-span-2">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition">
          <AppointmentCircle data={stats} total={totalAppointments} />
        </div>
      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
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
