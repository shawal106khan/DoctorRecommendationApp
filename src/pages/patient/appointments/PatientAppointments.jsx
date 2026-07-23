import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import AppointmentTimeline from "../../../components/common/appointments/AppointmentTimeline";
import { statusColor } from "../../../utils/statusColors";
import ReviewForm from "../../../components/common/ratings/ReviewForm";
import Modal from "../../../components/common/components/Modal";
import { fetchAppointmentsForPatient } from "../../../services/appointmentService";
import { getPatientByUserId, getUserData } from "../../../services/userService";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { formatTime } from "../../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck,
  MapPin,
  Clock,
  Star,
  User,
  Briefcase,
  List,
  Stethoscope,
  Banknote,
} from "lucide-react";

const InfoRow = ({ icon, label, value }) => {
  const IconComponent = icon;
  return (
    <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
      <IconComponent size={10} className="text-[#1A6FA8] flex-shrink-0" />
      {label}: <strong className="text-[#0D2E4E] ml-0.5">{value || "-"}</strong>
    </p>
  );
};

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewAppointment, setReviewAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { userId } = await getUserData();
        const patient = await getPatientByUserId(userId);
        if (!patient) {
          setAppointments([]);
          return;
        }
        const data = await fetchAppointmentsForPatient(patient.patients_id);
        setAppointments(data);
      } catch (err) {
        console.error(err);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Track and manage your appointments
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
              <div>
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                  Patient Portal
                </p>
                <h1 className="text-xl font-bold text-[#0D2E4E]">
                  My Appointments
                </h1>
              </div>
            </div>
            {appointments.length > 0 && (
              <div className="bg-white border border-[#D6E6F2] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {appointments.length} Total
              </div>
            )}
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
                Book your first appointment with a verified doctor.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((a) => {
                const doctorName = a.doctors?.name || "Unknown Doctor";
                const doctorSpec = a.doctors?.specializations?.name || "";
                const doctorHospital =
                  a.doctors?.doctor_locations?.hospital_name || "";
                const doctorCity = a.doctors?.doctor_locations?.city || "";
                const doctorAddress =
                  a.doctors?.doctor_locations?.address || "";
                const doctorAvatar = a.doctors?.doctor_profile?.profile_pic_url;
                const doctorBio = a.doctors?.doctor_profile?.doctor_bio || "";
                const doctorFee = a.doctors?.consultation_fee;
                const patientName = a.patient_name || "Unknown Patient";
                const review = a.reviews?.[0];

                const timeline = (a.appointment_timeline || []).map((t) => ({
                  state: t.state,
                  at: t.status_at,
                  note: t.note,
                }));

                return (
                  <div
                    key={a.appointment_id}
                    className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden"
                  >
                    <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />

                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div
                        className={`text-xs font-bold capitalize px-3 py-1.5 rounded-full ${statusColor(a.status)}`}
                      >
                        {a.status}
                      </div>
                      <p className="text-[10px] text-[#8AAEC8]">
                        {a.created_at
                          ? new Date(a.created_at).toLocaleString()
                          : "-"}
                      </p>
                    </div>

                    <div className="p-5 flex flex-col lg:flex-row gap-0">
                      {/* LEFT — Doctor Details */}
                      <div className="flex-1 pr-0 lg:pr-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
                            <Stethoscope size={11} className="text-[#1A6FA8]" />
                          </div>
                          <p className="text-[10px] font-bold text-[#1A6FA8] uppercase tracking-widest">
                            Doctor Details
                          </p>
                        </div>

                        <div className="flex gap-3 mb-3">
                          <div className="relative flex-shrink-0">
                            <img
                              src={doctorAvatar || "/avatar-placeholder.png"}
                              alt={doctorName}
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D6E6F2]"
                            />
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#0D2E4E] text-sm">
                              Dr. {doctorName}
                            </h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {doctorSpec && (
                                <span className="bg-[#E8F4FD] text-[#1A6FA8] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                  {doctorSpec}
                                </span>
                              )}
                              {doctorHospital && (
                                <span className="bg-[#F0F4F8] text-[#4A6680] text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <MapPin size={8} />
                                  {doctorHospital}
                                  {doctorCity ? `, ${doctorCity}` : ""}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {doctorBio && (
                          <p className="text-xs text-[#8AAEC8] line-clamp-1 mb-3">
                            {doctorBio}
                          </p>
                        )}

                        <div className="space-y-1.5">
                          <InfoRow
                            icon={MapPin}
                            label="Clinic"
                            value={doctorAddress || doctorHospital}
                          />
                          <InfoRow
                            icon={Banknote}
                            label="Fee"
                            value={doctorFee ? `PKR ${doctorFee}` : "Not set"}
                          />
                          <InfoRow
                            icon={CalendarCheck}
                            label="Date"
                            value={
                              a.appointment_date
                                ? new Date(
                                    a.appointment_date,
                                  ).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "-"
                            }
                          />
                        </div>
                      </div>

                      {/* Vertical Divider */}
                      <div className="hidden lg:block w-px bg-[#E8F0F8] mx-2 self-stretch" />
                      <div className="block lg:hidden h-px bg-[#E8F0F8] my-4" />

                      {/* RIGHT — Patient Details */}
                      <div className="flex-1 pl-0 lg:pl-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
                            <User size={11} className="text-[#1A6FA8]" />
                          </div>
                          <p className="text-[10px] font-bold text-[#1A6FA8] uppercase tracking-widest">
                            Patient Details
                          </p>
                        </div>

                        <div className="space-y-1.5 mb-4">
                          <InfoRow
                            icon={User}
                            label="Name"
                            value={patientName}
                          />
                          <InfoRow
                            icon={User}
                            label="Age"
                            value={a.patient_age}
                          />
                          <InfoRow
                            icon={User}
                            label="Gender"
                            value={a.patient_gender}
                          />
                          <InfoRow
                            icon={MapPin}
                            label="Address"
                            value={a.patient_address}
                          />
                          <InfoRow
                            icon={Briefcase}
                            label="Reason"
                            value={a.reason_for_visit}
                          />
                        </div>

                        <AppointmentTimeline timeline={timeline} />

                        {["accepted", "approved"].includes(a.status) && (
                          <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3 py-2.5 space-y-1 mt-3">
                            <p className="text-xs text-[#6B839A]">
                              Queue Number:{" "}
                              <strong className="text-[#0D2E4E]">
                                {a.queue_number || "-"}
                              </strong>
                            </p>
                            <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                              <Clock size={10} className="text-[#1A6FA8]" />
                              Arrive at:{" "}
                              <strong className="text-[#0D2E4E]">
                                {a.arrival_time
                                  ? formatTime(a.arrival_time)
                                  : "-"}
                              </strong>
                            </p>
                          </div>
                        )}

                        {/* ✅ Fee paid — show when completed */}
                        {a.status === "completed" && (
                          <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2.5 mt-3 flex items-center gap-2">
                            <Banknote
                              size={13}
                              className="text-green-600 flex-shrink-0"
                            />
                            <p className="text-xs text-green-700 font-semibold">
                              Fee Paid: <strong>PKR {a.fee_paid ?? 0}</strong>
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2 mt-3">
                          {["accepted", "approved", "pending"].includes(
                            a.status,
                          ) && (
                            <button
                              onClick={() =>
                                navigate(
                                  `/patient/queue?doctorId=${a.doctors_id}&date=${a.appointment_date}&myAppointmentId=${a.appointment_id}`,
                                )
                              }
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition"
                            >
                              <List size={12} />
                              View Queue
                            </button>
                          )}

                          {a.status === "completed" && !review && (
                            <button
                              onClick={() => setReviewAppointment(a)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-600 text-xs font-semibold hover:bg-yellow-100 transition"
                            >
                              <Star size={12} />
                              Write Review
                            </button>
                          )}

                          {review && (
                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 border border-green-100 px-3 py-2 rounded-xl">
                              <Star size={12} fill="currentColor" />
                              {review.rating} — Review submitted
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={!!reviewAppointment}
        onClose={() => setReviewAppointment(null)}
        title="Leave a Review"
      >
        {reviewAppointment && (
          <ReviewForm
            appointment={reviewAppointment}
            onDone={async () => {
              await (async () => {
                try {
                  const { userId } = await getUserData();
                  const patient = await getPatientByUserId(userId);
                  if (patient) {
                    const data = await fetchAppointmentsForPatient(
                      patient.patients_id,
                    );
                    setAppointments(data);
                  }
                } catch (error) {
                  console.error(error);
                }
              })();
              setReviewAppointment(null);
            }}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default PatientAppointments;
