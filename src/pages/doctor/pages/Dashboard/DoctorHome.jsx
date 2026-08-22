import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import StatCard from "./components/StatCard";
import AppointmentCard from "./components/AppointmentCard";
import AppointmentCircle from "./components/AppointmentCircle";
import { Stethoscope } from "lucide-react";
import {
  getDoctorByUserId,
  getUserData,
} from "../../../../services/userService";
import {
  fetchAppointmentsForDoctor,
  updateAppointmentStatusByDoctor,
} from "../../../../services/appointmentService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const DoctorHome = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const loadAppointments = async () => {
    const { userId } = await getUserData();
    const doctor = await getDoctorByUserId(userId);
    if (!doctor) {
      setAppointments([]);
      return;
    }
    const data = await fetchAppointmentsForDoctor(doctor.doctors_id);
    const mapped = data.map((a) => ({
      id: a.appointment_id,
      patientName: a.patient_name || "Unknown Patient",
      patientAge: a.patient_age || "-",
      patientGender: a.patient_gender || "-",
      patientAddress: a.patient_address || "-",
      selectedDay: a.appointment_date || "",
      queueNumber: a.queue_number || "-",
      date: a.created_at,
      time: a.arrival_time || "Pending",
      status: a.status,
    }));
    setAppointments(mapped);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadAppointments();
      } catch (err) {
        console.error(err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatusByDoctor(id, status, {});
      await loadAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );

  const totalAppointments = appointments.length;
  const pending = appointments.filter((a) => a.status === "pending").length;
  const accepted = appointments.filter(
    (a) => a.status === "approved" || a.status === "completed",
  ).length;
  const completed = appointments.filter((a) => a.status === "completed").length;

  const stats = [
    { label: "Total Appointments", value: totalAppointments },
    { label: "Pending Requests", value: pending },
    { label: "Accepted", value: accepted },
    { label: "Completed", value: completed },
  ];
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
  const visibleAppointments = showAll
    ? sortedAppointments
    : sortedAppointments.slice(0, 3);
  return (
    <div className="bg-[#F0F4F8] min-h-screen">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4  sm:px-8 py-2.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
        <p className="text-white/75 text-xs font-medium tracking-wide">
          Doctor Portal — Manage your appointments and patients
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8 space-y-5 sm:space-y-6">
        {/* Greeting banner */}
        <div className="relative bg-gradient-to-br from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] rounded-2xl p-5 sm:p-7 overflow-hidden shadow-[0_8px_32px_rgba(26,111,168,0.25)]">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white opacity-5" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-[#38B2A0] opacity-10 blur-2xl" />
          <div className="relative z-10 flex flex-col sm:flex-row  sm:items-center justify-between gap-4">
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-[2px] mb-1">
                Doctor Dashboard
              </p>
              <h1 className="text-lg sm:text-2xl font-bold text-white flex flex-wrap items-center gap-1.5 sm:gap-2 leading-snug">
                <span>
                  {getGreeting()}, Dr. {user?.name}
                </span>
                <Stethoscope
                  size={18}
                  className="text-white/80 flex-shrink-0 sm:w-6 sm:h-6"
                />
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Here's an overview of your activity today
              </p>
            </div>
            <div className="flex sm:hidden md:flex flex-row sm:flex-col items-center sm:items-end gap-1.5">
              <div className="bg-white/15 border border-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-white font-bold text-2xl leading-none">
                  {totalAppointments}
                </p>
                <p className="text-white/60 text-[10px] mt-0.5">Total Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats + Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:col-span-2">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-4 sm:p-6 flex items-center justify-center">
            <AppointmentCircle data={stats} total={totalAppointments} />
          </div>
        </div>

        {/* Appointments list */}
        <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
          <div className="px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 sm:mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
                <div>
                  <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                    Overview
                  </p>
                  <h2 className="text-lg font-bold text-[#0D2E4E]">
                    Today's Appointments
                  </h2>
                </div>
              </div>
              {appointments.length > 0 && (
                <div className="bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full self-start sm:self-auto">
                  {appointments.length} Total
                </div>
              )}
            </div>

            {appointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 sm:py-14 px-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                  <Stethoscope size={24} className="text-[#1A6FA8]" />
                </div>
                <p className="text-[#0D2E4E] font-bold mb-1">
                  No Appointments Yet
                </p>
                <p className="text-[#6B839A] text-sm">
                  Your appointment requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {visibleAppointments.map((appt) => (
                  <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    onStatusChange={handleStatusChange}
                  />
                ))}

                {appointments.length > 3 && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="text-[#1A6FA8] text-sm font-semibold px-4 py-2 rounded-xl border border-[#D6E6F2] hover:bg-[#F7FAFE] transition"
                    >
                      {showAll
                        ? "Show Less"
                        : `Show More (${appointments.length - 3} more)`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
