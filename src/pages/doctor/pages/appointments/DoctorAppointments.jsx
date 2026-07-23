import { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Modal from "../../../../components/common/components/Modal";
import {
  getDoctorByUserId,
  getUserData,
} from "../../../../services/userService";
import {
  fetchAppointmentsForDoctor,
  updateAppointmentStatusByDoctor,
} from "../../../../services/appointmentService";
import AppointmentTimeline from "../../../../components/common/appointments/AppointmentTimeline";
import { statusColor } from "../../../../utils/statusColors";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import { formatDateTimeShort } from "../../../../utils/formatDateTimeShort";
import { formatTime } from "../../../../utils/formatTime";
import {
  User,
  MapPin,
  CalendarCheck,
  Clock,
  Hash,
  Eye,
  Banknote,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ButtonLoader from "../../../../components/common/components/ButtonLoader";
import { useLoading } from "../../../../hooks/useLoading";
const InfoRow = ({ icon, value }) => {
  const IconComponent = icon;
  return (
    <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
      <IconComponent size={9} className="text-[#1A6FA8] flex-shrink-0" />
      <span className="text-[#0D2E4E] font-medium truncate">{value}</span>
    </p>
  );
};

// Group appointments by date
const groupByDate = (appointments) => {
  const groups = {};
  appointments.forEach((a) => {
    const date = a.appointment_date || "Unknown";
    if (!groups[date]) groups[date] = [];
    groups[date].push(a);
  });
  // Sort dates ascending
  return Object.entries(groups).sort(([a], [b]) => new Date(a) - new Date(b));
};

const formatGroupDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (isToday) return `Today — ${formatted}`;
  if (isTomorrow) return `Tomorrow — ${formatted}`;
  return formatted;
};

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { loading, stopLoading } = useLoading(true);
  const [feePaid, setFeePaid] = useState("");
  const [showFeeInput, setShowFeeInput] = useState(false);
  const [collapsedDates, setCollapsedDates] = useState({});
  const [actionLoading, setActionLoading] = useState(false);
  const loadAppointments = async () => {
    const { userId } = await getUserData();
    const doctor = await getDoctorByUserId(userId);
    if (!doctor) {
      setAppointments([]);
      return;
    }
    const data = await fetchAppointmentsForDoctor(doctor.doctors_id);
    setAppointments(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadAppointments();
      } catch (err) {
        console.error(err);
        setAppointments([]);
      } finally {
        stopLoading();
      }
    };
    load();
  }, [stopLoading]);

  const toggleDate = (date) => {
    setCollapsedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setShowFeeInput(false);
    setFeePaid("");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      setActionLoading(true);
      await updateAppointmentStatusByDoctor(appointmentId, status, {});
      await loadAppointments();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkComplete = async () => {
    try {
      setActionLoading(true);
      await updateAppointmentStatusByDoctor(
        selectedAppointment.appointment_id,
        "completed",
        { fee_paid: Number(feePaid) || 0 },
      );
      await loadAppointments();
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );

  const groupedAppointments = groupByDate(appointments);

  return (
    <DashboardLayout role="doctor">
      <div className="bg-[#F0F4F8] min-h-screen">
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Review and manage patient appointment requests
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />

              <div>
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                  Doctor Portal
                </p>

                <h1 className="text-xl font-bold text-[#0D2E4E]">
                  Appointments
                </h1>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="no-print bg-[#1A6FA8] text-white px-4 py-2 rounded-lg hover:bg-[#1d8bd4] text-sm font-semibold"
              >
                Print Appointments
              </button>

              {appointments.length > 0 && (
                <div className="bg-white border border-[#D6E6F2] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {appointments.length} Total
                </div>
              )}
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-[#D6E6F2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                <CalendarCheck size={24} className="text-[#1A6FA8]" />
              </div>
              <p className="text-[#0D2E4E] font-bold mb-1">
                No Appointments Yet
              </p>
              <p className="text-[#6B839A] text-sm">
                Patient requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedAppointments.map(([date, dateAppointments]) => {
                const isCollapsed = collapsedDates[date];
                const completedCount = dateAppointments.filter(
                  (a) => a.status === "completed",
                ).length;
                const pendingCount = dateAppointments.filter(
                  (a) => a.status === "pending",
                ).length;
                const approvedCount = dateAppointments.filter((a) =>
                  ["approved", "accepted"].includes(a.status),
                ).length;

                return (
                  <div key={date}>
                    {/* Date header — clickable to collapse */}
                    <button
                      onClick={() => toggleDate(date)}
                      className="w-full flex items-center justify-between mb-3 group"
                    >
                      <div className="flex items-center gap-3">
                        {/* Date pill */}
                        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_2px_8px_rgba(26,111,168,0.30)]">
                          <CalendarCheck size={13} />
                          <span className="text-xs font-bold">
                            {formatGroupDate(date)}
                          </span>
                        </div>

                        {/* Stats badges */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold bg-white border border-[#D6E6F2] text-[#1A6FA8] px-2 py-0.5 rounded-full">
                            {dateAppointments.length} total
                          </span>
                          {completedCount > 0 && (
                            <span className="text-[10px] font-bold bg-green-50 border border-green-200 text-green-600 px-2 py-0.5 rounded-full">
                              {completedCount} done
                            </span>
                          )}
                          {approvedCount > 0 && (
                            <span className="text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-600 px-2 py-0.5 rounded-full">
                              {approvedCount} waiting
                            </span>
                          )}
                          {pendingCount > 0 && (
                            <span className="text-[10px] font-bold bg-yellow-50 border border-yellow-200 text-yellow-600 px-2 py-0.5 rounded-full">
                              {pendingCount} pending
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Collapse icon */}
                      <div className="text-[#4A6680] group-hover:text-[#1A6FA8] transition">
                        {isCollapsed ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronUp size={16} />
                        )}
                      </div>
                    </button>

                    {/* Appointments for this date */}
                    {!isCollapsed && (
                      <div className="space-y-3 pl-2 border-l-2 border-[#D6E6F2]">
                        {dateAppointments
                          .sort(
                            (a, b) =>
                              (a.queue_number || 999) - (b.queue_number || 999),
                          )
                          .map((a) => {
                            const timeline = (a.appointment_timeline || []).map(
                              (t) => ({
                                state: t.state,
                                at: t.status_at,
                                note: t.note,
                              }),
                            );
                            return (
                              <div
                                key={a.appointment_id}
                                className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden"
                              >
                                <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                  <div className="flex gap-3 flex-1 min-w-0">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0">
                                      <span className="text-white font-bold text-sm">
                                        {a.patient_name?.[0]?.toUpperCase() ||
                                          "P"}
                                      </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <p className="font-bold text-[#0D2E4E] text-sm">
                                          {a.patient_name || "Unknown Patient"}
                                        </p>
                                        <div
                                          className={`text-[10px] font-bold capitalize px-2 py-0.5 rounded-full ${statusColor(a.status)}`}
                                        >
                                          {a.status}
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1">
                                        <InfoRow
                                          icon={User}
                                          value={`Age: ${a.patient_age || "-"}`}
                                        />
                                        <InfoRow
                                          icon={User}
                                          value={a.patient_gender || "-"}
                                        />
                                        <InfoRow
                                          icon={MapPin}
                                          value={a.patient_address || "-"}
                                        />
                                        <InfoRow
                                          icon={Hash}
                                          value={`Queue: ${a.queue_number || "-"}`}
                                        />
                                        <InfoRow
                                          icon={Clock}
                                          value={
                                            a.arrival_time
                                              ? formatTime(a.arrival_time)
                                              : "-"
                                          }
                                        />
                                        {a.status === "completed" && (
                                          <InfoRow
                                            icon={Banknote}
                                            value={`Fee: PKR ${a.fee_paid ?? 0}`}
                                          />
                                        )}
                                      </div>
                                      <p className="text-[10px] text-[#8AAEC8] mt-1">
                                        {formatDateTimeShort(a.created_at)}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      setSelectedAppointment({ ...a, timeline })
                                    }
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold hover:bg-[#1A6FA8] hover:text-white transition-all flex-shrink-0"
                                  >
                                    <Eye size={13} />
                                    View
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!selectedAppointment}
        onClose={closeModal}
        title="Appointment Details"
      >
        {selectedAppointment && (
          <div className="space-y-2">
            {[
              {
                label: "Patient",
                value: selectedAppointment.patient_name || "Unknown",
              },
              { label: "Age", value: selectedAppointment.patient_age || "-" },
              {
                label: "Gender",
                value: selectedAppointment.patient_gender || "-",
              },
              {
                label: "Address",
                value: selectedAppointment.patient_address || "-",
              },
              {
                label: "Date",
                value: selectedAppointment.appointment_date
                  ? new Date(
                      selectedAppointment.appointment_date,
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "-",
              },
              { label: "Status", value: selectedAppointment.status },
              {
                label: "Queue No",
                value: selectedAppointment.queue_number || "-",
              },
              {
                label: "Arrival Time",
                value: selectedAppointment.arrival_time
                  ? formatTime(selectedAppointment.arrival_time)
                  : "-",
              },
              ...(selectedAppointment.status === "completed"
                ? [
                    {
                      label: "Fee Paid",
                      value: `PKR ${selectedAppointment.fee_paid ?? 0}`,
                    },
                  ]
                : []),
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-3"
              >
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide w-24 flex-shrink-0 mt-0.5">
                  {label}
                </p>
                <p className="text-sm font-medium text-[#0D2E4E] capitalize">
                  {value}
                </p>
              </div>
            ))}

            <AppointmentTimeline
              timeline={selectedAppointment.timeline || []}
            />

            {selectedAppointment.status === "pending" && (
              <div className="flex gap-3 pt-2">
                <button
                  disabled={actionLoading}
                  onClick={() =>
                    handleStatusChange(
                      selectedAppointment.appointment_id,
                      "approved",
                    )
                  }
                  className="flex-1 h-11 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition disabled:opacity-60"
                >
                  {actionLoading ? (
                    <ButtonLoader text="Accepting..." />
                  ) : (
                    "Accept"
                  )}
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() =>
                    handleStatusChange(
                      selectedAppointment.appointment_id,
                      "rejected",
                    )
                  }
                  className="flex-1 h-11 bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 text-sm font-bold rounded-xl transition disabled:opacity-60"
                >
                  {actionLoading ? (
                    <ButtonLoader text="Rejecting..." />
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            )}

            {selectedAppointment.status === "approved" && (
              <div className="pt-2 space-y-3">
                {!showFeeInput ? (
                  <button
                    onClick={() => setShowFeeInput(true)}
                    className="w-full h-11 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl transition"
                  >
                    Mark as Completed
                  </button>
                ) : (
                  <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Banknote size={14} className="text-[#1A6FA8]" />
                      <p className="text-xs font-bold text-[#0D2E4E]">
                        Enter Fee
                      </p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1">
                        Fee Paid (PKR)
                      </label>
                      <input
                        type="number"
                        value={feePaid}
                        onChange={(e) => setFeePaid(e.target.value)}
                        placeholder="0 if waived"
                        className="w-full h-10 px-3 rounded-xl text-sm text-[#0D2E4E] bg-white border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setShowFeeInput(false)}
                        className="flex-1 h-10 border border-[#D6E6F2] text-[#4A6680] text-sm font-semibold rounded-xl hover:bg-[#F0F4F8] transition"
                      >
                        Cancel
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={handleMarkComplete}
                        className="flex-1 h-10 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl transition disabled:opacity-60"
                      >
                        {actionLoading ? (
                          <ButtonLoader text="Completing..." />
                        ) : (
                          "Confirm & Complete"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default DoctorAppointments;
