import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "./components/StatsCard";
import { getAdminStats } from "../../services/adminService";
import DoctorStatusCircle from "./components/DoctorStatusCircle";
import toast from "react-hot-toast";
import { getDoctors } from "../../store/doctorStore";
import LoadingSpinner from "../../components/common/components/LoadingSpinner";
import {
  Stethoscope,
  ShieldCheck,
  ShieldOff,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  CalendarCheck,
  Banknote,
  Users,
  Star,
  ClipboardList,
} from "lucide-react";

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1 h-7 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
    <h2 className="text-base font-bold text-[#0D2E4E]">{title}</h2>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };
    loadStats();
  }, []);

  useEffect(() => {
    const doctors = getDoctors();
    const pendingDoctors = doctors.filter(
      (doc) =>
        (doc.status === "pending" || doc.isApproved === false) &&
        !doc.approvalNotified,
    );
    pendingDoctors.forEach((doc) => {
      toast.success(`New doctor registered: ${doc.name} pending approval`);
      doc.approvalNotified = true;
    });
    localStorage.setItem("verified_doctors", JSON.stringify(doctors));
  }, []);

  if (!stats)
    return (
      <DashboardLayout role="admin">
        <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center">
          <LoadingSpinner text="Loading Dashboard..." />
        </div>
      </DashboardLayout>
    );

  const doctorCards = [
    {
      label: "Total Doctors",
      value: stats.totalDoctors,
      icon: Stethoscope,
      bg: "bg-[#E8F4FD]",
      color: "text-[#1A6FA8]",
    },
    {
      label: "Active Doctors",
      value: stats.activeDoctors,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      label: "Doctors Pending Approval",
      value: stats.pendingDoctors,
      icon: Clock,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
    {
      label: "Approved Doctors",
      value: stats.approvedDoctors,
      icon: ShieldCheck,
      bg: "bg-teal-50",
      color: "text-[#38B2A0]",
    },
    {
      label: "Suspended Doctors",
      value: stats.suspendedDoctors,
      icon: ShieldOff,
      bg: "bg-orange-50",
      color: "text-orange-500",
    },
    {
      label: "Rejected Doctors",
      value: stats.rejectedDoctors,
      icon: XCircle,
      bg: "bg-red-50",
      color: "text-red-500",
    },
    {
      label: "Deleted Doctors",
      value: stats.deletedDoctors,
      icon: Trash2,
      bg: "bg-gray-100",
      color: "text-gray-500",
    },
    {
      label: "Appointments This Month",
      value: stats.monthlyAppointments,
      icon: CalendarCheck,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "Total Fees Collected",
      value: stats.totalFeeCollected,
      icon: Banknote,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
  ];

  const patientCards = [
    {
      label: "Total Patients Registered",
      value: stats.patients,
      icon: Users,
      bg: "bg-[#E8F4FD]",
      color: "text-[#1A6FA8]",
    },
    {
      label: "Total Appointments Booked",
      value: stats.appointments,
      icon: ClipboardList,
      bg: "bg-teal-50",
      color: "text-[#38B2A0]",
    },
    {
      label: "Appointments Completed",
      value: stats.completedAppointments,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      label: "Appointments Pending",
      value: stats.pendingAppointments,
      icon: Clock,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Welcome back — here's a complete overview of your platform
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8 space-y-6">
          {/* Page header */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                Dashboard Overview
              </h1>
            </div>
          </div>

          {/* ── DOCTOR OVERVIEW ── */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
            <div className="px-6 py-6">
              <SectionHeader title="Doctor Overview" />
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctorCards.map(({ label, value, icon, bg, color }) => {
                    const Icon = icon;
                    return (
                      <div
                        key={label}
                        className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl px-4 py-4 flex items-center gap-3 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}
                        >
                          <Icon size={18} className={color} />
                        </div>
                        <div>
                          <p className="text-xl font-bold text-[#0D2E4E] leading-none">
                            {value ?? "—"}
                          </p>
                          <p className="text-[10px] text-[#6B839A] font-semibold mt-0.5 leading-tight">
                            {label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="lg:w-72 flex items-center justify-center bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl p-4">
                  <DoctorStatusCircle
                    data={stats.doctorStatusData}
                    total={stats.totalDoctors}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── TOP RATED + MOST BOOKED ── */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0]" />
              <div className="px-6 py-5">
                <SectionHeader title="Top Rated Doctors" />
                {!stats.topRatedDoctors?.length ? (
                  <p className="text-xs text-[#8AAEC8] text-center py-6">
                    No ratings yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.topRatedDoctors.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[9px] font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-[#0D2E4E]">
                            {doc.doctorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-100 px-2.5 py-1 rounded-full">
                          <Star
                            size={10}
                            className="text-yellow-400"
                            fill="currentColor"
                          />
                          <span className="text-xs font-bold text-yellow-600">
                            {doc.averageRating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#336aac] to-[#38B2A0]" />
              <div className="px-6 py-5">
                <SectionHeader title="Most Booked Doctors" />
                {!stats.mostBookedDoctors?.length ? (
                  <p className="text-xs text-[#8AAEC8] text-center py-6">
                    No bookings yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {stats.mostBookedDoctors.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#336aac] to-[#38B2A0] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[9px] font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-[#0D2E4E]">
                            {doc.doctorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#E8F4FD] border border-[#D6E6F2] px-2.5 py-1 rounded-full">
                          <CalendarCheck size={10} className="text-[#1A6FA8]" />
                          <span className="text-xs font-bold text-[#1A6FA8]">
                            {doc.count} bookings
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#38B2A0] to-[#1A6FA8]" />
            <div className="px-6 py-5">
              <SectionHeader title="Doctor Fee Collection" />
              {!stats.doctorFeeStats?.length ? (
                <p className="text-xs text-[#8AAEC8] text-center py-6">
                  No fee data yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.doctorFeeStats.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#38B2A0] to-[#2d9e8f] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[9px] font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-[#0D2E4E]">
                          {doc.doctorName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                        <span className="text-xs font-bold text-green-600">
                          Rs. {doc.totalFee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* ── PATIENT & APPOINTMENT OVERVIEW ── */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
            <div className="px-6 py-6">
              <SectionHeader title="Patient & Appointment Overview" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {patientCards.map(({ label, value, icon, bg, color }) => {
                  const Icon = icon;
                  return (
                    <div
                      key={label}
                      className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl px-4 py-4 flex items-center gap-3 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}
                      >
                        <Icon size={18} className={color} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-[#0D2E4E] leading-none">
                          {value ?? "—"}
                        </p>
                        <p className="text-[10px] text-[#6B839A] font-semibold mt-0.5 leading-tight">
                          {label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
