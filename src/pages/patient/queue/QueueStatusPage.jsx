import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { supabase } from "../../../lib/supabase";
import {
  Clock,
  User,
  CalendarCheck,
  CheckCircle,
  Hourglass,
  Timer,
} from "lucide-react";
import { formatTime } from "../../../utils/formatTime";
import { getPatientByUserId, getUserData } from "../../../services/userService";
import { fetchAppointmentsForPatient } from "../../../services/appointmentService";

const statusConfig = {
  completed: {
    label: "Done ✓",
    color: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  approved: {
    label: "Waiting",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500 animate-pulse",
  },
  accepted: {
    label: "Waiting",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500 animate-pulse",
  },
  pending: {
    label: "Not Confirmed",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-400",
  },
};

const QueueStatusPage = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");
  const myAppointmentId = searchParams.get("myAppointmentId");

  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        // ✅ Use function instead of direct query
        const { data, error } = await supabase.rpc("get_doctor_queue", {
          p_doctor_id: doctorId,
          p_date: date,
        });

        if (error) throw error;

        setQueue(data || []);
        if (data?.[0]?.doctor_name) {
          setDoctorName(data[0].doctor_name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId && date) load();
    else setLoading(false);
  }, [doctorId, date]);

  const completed = queue.filter((q) => q.status === "completed").length;
  const inQueue = queue.filter((q) =>
    ["approved", "accepted"].includes(q.status),
  ).length;
  const pending = queue.filter((q) => q.status === "pending").length;
  const total = queue.length;

  // Find my position
  const myPosition =
    queue.findIndex((q) => q.appointment_id === myAppointmentId) + 1;
  const myAppointmentData = queue.find(
    (x) => x.appointment_id === myAppointmentId,
  );
  const myQueueNumber = myAppointmentData?.queue_number || 999;

  const patientsAheadOfMe = queue.filter(
    (q) =>
      q.appointment_id !== myAppointmentId &&
      ["approved", "accepted", "pending"].includes(q.status) &&
      (q.queue_number || 0) < myQueueNumber,
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout role="patient">
      <div className="bg-[#F0F4F8] min-h-screen">
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            See your appointment number and waiting status
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Appointment Status
              </p>
              <h1 className="text-lg sm:text-xl font-bold text-[#0D2E4E] leading-snug">
                {doctorName ? `Dr. ${doctorName}` : "Doctor"} —{" "}
                {date
                  ? new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </h1>
            </div>
          </div>

          {!doctorId || !date ? (
            <QueueFromAppointments />
          ) : (
            <>
              {/* My position card — shown if myAppointmentId exists */}
              {myAppointmentId && myPosition > 0 && (
                <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 text-white">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                    Your Appointment Number
                  </p>
                  <p className="text-4xl font-bold mb-2">#{myPosition}</p>
                  <p className="text-white/80 text-sm">
                    {patientsAheadOfMe === 0
                      ? "🎉 You are next!"
                      : `${patientsAheadOfMe} patient${patientsAheadOfMe > 1 ? "s" : ""} before you`}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid  grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-5 sm:mb-6">
                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-2.5 sm:p-4 text-center">
                  <CheckCircle
                    size={18}
                    className="text-green-500 mx-auto mb-1"
                  />
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {completed}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">
                    Seen by Doctor
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4 text-center">
                  <Timer size={18} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-blue-600">{inQueue}</p>
                  <p className="text-xs text-[#6B839A] mt-0.5">
                    Currently Waiting
                  </p>
                </div>
                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4 text-center">
                  <Hourglass
                    size={18}
                    className="text-yellow-500 mx-auto mb-1"
                  />
                  <p className="text-2xl font-bold text-yellow-600">
                    {pending}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">
                    Not Yet Confirmed
                  </p>
                </div>
              </div>

              {/* Queue list */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] overflow-hidden">
                <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-[#D6E6F2] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarCheck size={16} className="text-[#1A6FA8]" />
                    <p className="font-bold text-[#0D2E4E] text-sm">
                      All Appointments ({total})
                    </p>
                  </div>
                </div>

                {queue.length === 0 ? (
                  <div className="p-8 text-center text-[#6B839A] text-sm">
                    No appointments found for this date.
                  </div>
                ) : (
                  <div className="divide-y divide-[#F0F4F8]">
                    {queue.map((q) => {
                      const isMe = q.appointment_id === myAppointmentId;
                      const config =
                        statusConfig[q.status] || statusConfig.pending;

                      return (
                        <div
                          key={q.appointment_id}
                          className={`px-4 sm:px-5 py-3 sm:py-4 flex flex-wrap items-center justify-between gap-3 transition ${
                            isMe ? "bg-blue-50 border-l-4 border-[#1A6FA8]" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div
                              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                                isMe
                                  ? "bg-[#1A6FA8] text-white"
                                  : "bg-[#F0F4F8] text-[#4A6680]"
                              }`}
                            >
                              {q.queue_number || "—"}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[#0D2E4E]">
                                  {isMe
                                    ? "You"
                                    : `Appointment #${q.queue_number || "—"}`}
                                </p>
                                {isMe && (
                                  <span className="text-[10px] bg-[#1A6FA8] text-white px-2 py-0.5 rounded-full font-bold">
                                    Your Turn
                                  </span>
                                )}
                              </div>
                              {q.arrival_time && (
                                <p className="text-xs text-[#6B839A] flex items-center gap-1 mt-0.5">
                                  <Clock size={10} />
                                  Time: {formatTime(q.arrival_time)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${config.color}`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${config.dot}`}
                            />
                            {config.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Sidebar access — no params
const QueueFromAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { userId } = await getUserData();
        const patient = await getPatientByUserId(userId);
        if (patient) {
          const data = await fetchAppointmentsForPatient(patient.patients_id);
          setAppointments(
            data.filter((a) =>
              ["pending", "approved", "accepted"].includes(a.status),
            ),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#D6E6F2] p-6 sm:p-10 text-center">
        <CalendarCheck size={32} className="text-[#1A6FA8] mx-auto mb-3" />
        <p className="text-[#0D2E4E] font-bold">No Active Appointments</p>
        <p className="text-[#6B839A] text-sm mt-1">
          Book an appointment to see your waiting status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#4A6680] font-medium mb-4">
        Select an appointment to check your waiting number:
      </p>
      {appointments.map((a) => (
        <button
          key={a.appointment_id}
          onClick={() =>
            navigate(
              `/patient/queue?doctorId=${a.doctors_id}&date=${a.appointment_date}&myAppointmentId=${a.appointment_id}`,
            )
          }
          className="w-full bg-white rounded-2xl border border-[#D6E6F2] p-3 sm:p-4 flex items-center justify-between gap-2 hover:border-[#1A6FA8]/40 hover:shadow-sm transition text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4FD] flex items-center justify-center">
              <User size={16} className="text-[#1A6FA8]" />
            </div>
            <div>
              <p className="font-semibold text-[#0D2E4E] text-sm">
                Dr. {a.doctors?.name || "Unknown"}
              </p>
              <p className="text-xs text-[#6B839A]">
                {a.appointment_date
                  ? new Date(a.appointment_date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>
          <span className="text-xs text-[#1A6FA8] font-semibold capitalize bg-[#E8F4FD] px-3 py-1 rounded-full">
            {a.status === "approved" || a.status === "accepted"
              ? "Waiting"
              : a.status === "pending"
                ? "Not Confirmed"
                : a.status}
          </span>
        </button>
      ))}
    </div>
  );
};

export default QueueStatusPage;
