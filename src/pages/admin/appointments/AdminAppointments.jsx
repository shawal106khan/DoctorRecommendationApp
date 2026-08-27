import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { fetchAppointmentsForAdmin } from "../../../services/adminService";
import { useLoading } from "../../../hooks/useLoading";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Stethoscope,
  Filter,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const cfg = {
    completed: "bg-green-50 text-green-700 border-green-100",
    approved: "bg-[#E8F4FD] text-[#1A6FA8] border-[#D6E6F2]",
    rejected: "bg-red-50 text-red-500 border-red-100",
    pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
  };
  return (
    <span
      className={`text-[10px] font-bold capitalize px-2.5 py-1 rounded-full border ${cfg[status] || cfg.pending}`}
    >
      {status}
    </span>
  );
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { loading, startLoading, stopLoading } = useLoading(true);

  const loadAppointments = useCallback(async () => {
    try {
      startLoading();
      const data = await fetchAppointmentsForAdmin();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchesStatus = statusFilter
        ? appt.status?.toLowerCase() === statusFilter.toLowerCase()
        : true;
      const matchesDate = dateFilter
        ? appt.appointment_date?.startsWith(dateFilter)
        : true;
      return matchesStatus && matchesDate;
    });
  }, [appointments, statusFilter, dateFilter]);

  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending",
  ).length;
  const completedAppointments = appointments.filter(
    (a) => a.status === "completed",
  ).length;
  const cancelledAppointments = appointments.filter(
    (a) => a.status === "cancelled" || a.status === "rejected",
  ).length;

  const inputClass =
    "h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition";

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Monitor and track all patient appointments across the platform
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                Appointment Overview
              </h1>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner text="Loading Appointments..." />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
                {[
                  {
                    icon: CalendarCheck,
                    label: "Total Appointments",
                    value: totalAppointments,
                    bg: "bg-[#E8F4FD]",
                    color: "text-[#1A6FA8]",
                  },
                  {
                    icon: Clock,
                    label: "Pending",
                    value: pendingAppointments,
                    bg: "bg-yellow-50",
                    color: "text-yellow-600",
                  },
                  {
                    icon: CheckCircle2,
                    label: "Completed",
                    value: completedAppointments,
                    bg: "bg-green-50",
                    color: "text-green-600",
                  },
                  {
                    icon: XCircle,
                    label: "Cancelled",
                    value: cancelledAppointments,
                    bg: "bg-red-50",
                    color: "text-red-500",
                  },
                ].map(({ icon, label, value, bg, color }) => {
                  const Icon = icon;
                  return (
                    <div
                      key={label}
                      className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2.5 sm:gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}
                      >
                        <Icon size={18} className={color} />
                      </div>
                      <div>
                        <p className="text-lg sm:text-2xl font-bold text-[#0D2E4E] leading-none">
                          {value}
                        </p>
                        <p className="text-[10px] text-[#6B839A] font-semibold mt-0.5">
                          {label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-4 sm:p-5 mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Filter size={13} className="text-[#1A6FA8]" />
                  <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                    Filter Appointments
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`${inputClass} w-full sm:w-auto`}
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className={`${inputClass} w-full sm:w-auto`}
                  />
                  {(statusFilter || dateFilter) && (
                    <button
                      onClick={() => {
                        setStatusFilter("");
                        setDateFilter("");
                      }}
                      className="h-11 px-4 text-xs font-bold rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] text-[#4A6680] hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Appointments */}
              {filteredAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center bg-white rounded-2xl border border-[#D6E6F2]">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                    <CalendarCheck size={24} className="text-[#1A6FA8]" />
                  </div>
                  <p className="text-[#0D2E4E] font-bold mb-1">
                    No Appointments Found
                  </p>
                  <p className="text-[#6B839A] text-sm">
                    Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt.appointment_id}
                      className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden flex flex-col"
                    >
                      <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                        {/* Patient + status */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">
                                {appt.patient_name?.[0]?.toUpperCase() || "P"}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-[#0D2E4E] leading-tight">
                                {appt.patient_name}
                              </p>
                              <p className="text-[10px] text-[#6B839A]">
                                Patient
                              </p>
                            </div>
                          </div>
                          <StatusBadge status={appt.status} />
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

                        {/* Details */}
                        <div className="space-y-1.5">
                          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                            <Stethoscope size={10} className="text-[#1A6FA8]" />
                            Dr. {appt.doctors?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                            <CalendarCheck
                              size={10}
                              className="text-[#1A6FA8]"
                            />
                            {appt.appointment_date
                              ? new Date(
                                  appt.appointment_date,
                                ).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—"}
                          </p>
                          {appt.slot_start_time && (
                            <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                              <Clock size={10} className="text-[#1A6FA8]" />
                              {appt.slot_start_time}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAppointments;
