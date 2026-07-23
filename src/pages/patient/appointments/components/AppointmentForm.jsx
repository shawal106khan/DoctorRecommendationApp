import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../../components/common/components/Button";
import Input from "../../../../components/common/components/Input";
import {
  getPatientByUserId,
  getUserData,
} from "../../../../services/userService";
import {
  createAppointment,
  addAppointmentTimeline,
} from "../../../../services/appointmentService";
// import { useAuth } from "../../../../context/useAuth";
import { supabase } from "../../../../lib/supabase";
import {
  CalendarCheck,
  CheckCircle2,
  User,
  MapPin,
  ClipboardList,
  Clock,
} from "lucide-react";
import { generateTimeSlots } from "../../../../utils/generateTimeSlots";
import { useLoading } from "../../../../hooks/useLoading";
import ButtonLoader from "../../../../components/common/components/ButtonLoader";
const AppointmentForm = ({ doctor }) => {
  // const { user } = useAuth();
  const navigate = useNavigate();
  const { loading, startLoading, stopLoading } = useLoading(false);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const allowedDays = doctor.profile?.availableDays || [];

  const getAvailableDatesForNextWeek = (days) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i += 1) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      const shortDay = nextDate.toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (days.includes(shortDay)) {
        dates.push({
          value: nextDate.toISOString().split("T")[0],
          shortDay,
          day: nextDate.getDate(),
          month: nextDate.toLocaleDateString("en-US", { month: "short" }),
          year: nextDate.getFullYear(),
        });
      }
    }
    return dates;
  };

  const availableDateOptions = getAvailableDatesForNextWeek(allowedDays);
  useEffect(() => {
    const loadSlots = async () => {
      if (!appointmentDate) return;

      setAvailableSlots([]); // ✅ reset slots when date changes
      setSelectedSlot(null); // ✅ reset selected slot

      const availability = doctor.profile;

      const { data: bookedAppointments, error } = await supabase.rpc(
        "get_booked_slots",
        {
          p_doctor_id: doctor.id,
          p_date: appointmentDate,
        },
      );

      if (error) {
        console.error(error);
        return;
      }

      const bookedSlots =
        bookedAppointments?.map((a) => a.slot_start_time?.slice(0, 5)) || [];

      console.log("Doctor ID:", doctor.id);
      console.log("Date:", appointmentDate);
      console.log("Raw booked data:", bookedAppointments);
      console.log(
        "Booked slots after slice:",
        bookedAppointments?.map((a) => a.slot_start_time?.slice(0, 5)),
      );

      const slots = generateTimeSlots(
        availability.startTime,
        availability.endTime,
        availability.slotDuration,
        bookedSlots,
      );

      console.log("Available slots:", slots); // ✅ debug

      // ✅ Only show the next available slot (first unbooked)
      const nextSlot = slots.length ? [slots[0]] : [];
      setAvailableSlots(nextSlot);
    };

    loadSlots();
  }, [appointmentDate, doctor]);
  const handleSubmit = async () => {
    if (!name) {
      alert("Fill required fields");
      return;
    }

    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
      alert("Age must be between 1 and 150");
      return;
    }
    if (!appointmentDate) {
      alert("Please select appointment date");
      return;
    }
    if (!selectedSlot) {
      alert("Please select slot");
      return;
    }
    startLoading();
    const { data: authData } = await supabase.auth.getUser();
    if (!authData?.user?.id) {
      alert("Please login again");
      return;
    }
    const { userId } = await getUserData();
    const patient = await getPatientByUserId(userId);
    try {
      const payload = {
        doctors_id: doctor.id,
        patients_id: patient.patients_id,
        patient_name: name,
        patient_age: ageNum,
        patient_gender: gender,
        patient_address: location,
        reason_for_visit: note,
        appointment_date: appointmentDate,
        slot_start_time: selectedSlot.rawStart,
        slot_end_time: selectedSlot.rawEnd,
        queue_number: null,
        arrival_time: null,
        status: "pending",
      };
      const created = await createAppointment(payload);
      await addAppointmentTimeline(
        created.appointment_id,
        "pending",
        "Appointment created",
      );
      setNote("");
      setName("");
      setAge("");
      setGender("");
      setLocation("");
      setSuccess(true);
    } catch (err) {
      console.error(err);

      alert("Failed to create appointment");
    } finally {
      stopLoading();
    }
  };

  // ── SUCCESS STATE ──
  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#38B2A0] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(26,111,168,0.30)]">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-[#0D2E4E] mb-2">
          Appointment Requested!
        </h3>
        <p className="text-sm text-[#6B839A] mb-6 leading-relaxed">
          Your appointment is pending confirmation from the doctor. You'll be
          notified once it's approved.
        </p>
        <Button
          text="View My Appointments"
          onClick={() => navigate("/patient/appointments")}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
      {/* Card header */}
      <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center">
          <CalendarCheck size={17} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Appointment Details</p>
          <p className="text-white/60 text-[11px]">
            Fill in the patient information below
          </p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Section: Patient Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
              <User size={12} className="text-[#1A6FA8]" />
            </div>
            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest">
              Patient Info
            </p>
          </div>
          <div className="space-y-3">
            <Input
              label="Patient Name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Patient Age"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "-" ||
                  e.key === "e" ||
                  e.key === "+" ||
                  e.key === "0"
                ) {
                  e.preventDefault();
                }
              }}
              min={1}
              max={150}
              step={1}
            />

            {/* Gender select — reusing your Select style */}
            <div>
              <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-12 px-4 rounded-xl text-sm text-[#1c5792] bg-[#f6f7f9] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#0b3957] focus:ring-4 focus:ring-[#1A6FA8]/10"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

        {/* Section: Location */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
              <MapPin size={12} className="text-[#1A6FA8]" />
            </div>
            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest">
              Location
            </p>
          </div>
          <Input
            label="Your Address"
            placeholder="City or Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

        {/* Section: Date selection */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
              <CalendarCheck size={12} className="text-[#1A6FA8]" />
            </div>
            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest">
              Select Appointment Day
            </p>
          </div>

          {/* Available days info */}
          <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-3 mb-4">
            <p className="text-xs text-[#4A6680]">
              Doctor available on{" "}
              <span className="font-bold text-[#1A6FA8]">
                {allowedDays.length
                  ? allowedDays.join(", ")
                  : "no selected days"}
              </span>
            </p>
            <p className="text-[10px] text-[#8AAEC8] mt-0.5">
              Select one of the available days below
            </p>
          </div>

          {availableDateOptions.length === 0 ? (
            <p className="text-sm text-red-400 font-medium">
              No available dates found for this doctor.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableDateOptions.map((date) => {
                const isSelected = appointmentDate === date.value;
                return (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setAppointmentDate(date.value)}
                    className={`rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-[#1A6FA8] bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white shadow-[0_4px_16px_rgba(26,111,168,0.35)]"
                        : "border-[#D6E6F2] bg-[#F7FAFE] text-[#0D2E4E] hover:border-[#1A6FA8]/40 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p
                          className={`text-[10px] uppercase tracking-widest font-semibold ${isSelected ? "text-white/70" : "text-[#4A6680]"}`}
                        >
                          {date.shortDay}
                        </p>
                        <p className="mt-1 text-xl font-bold leading-none">
                          {date.day}
                        </p>
                        <p
                          className={`mt-1 text-[11px] font-medium ${isSelected ? "text-white/70" : "text-[#6B839A]"}`}
                        >
                          {date.month}
                        </p>
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[#E8F4FD] text-[#1A6FA8]"
                        }`}
                      >
                        {isSelected ? "Selected" : "Open"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
              <Clock size={12} className="text-[#1A6FA8]" />
            </div>

            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest">
              Select Time Slot
            </p>
          </div>

          {!appointmentDate ? (
            <p className="text-sm text-[#6B839A]">Select a date first</p>
          ) : availableSlots.length === 0 ? (
            <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl p-4 text-sm font-medium">
              Fully booked for this day
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot?.start === slot.start;

                return (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl px-4 py-3 border text-sm font-semibold transition ${
                      isSelected
                        ? "bg-[#1A6FA8] text-white border-[#1A6FA8]"
                        : "bg-[#F7FAFE] border-[#D6E6F2] text-[#0D2E4E]"
                    }`}
                  >
                    {slot.start}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

        {/* Section: Reason */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center">
              <ClipboardList size={12} className="text-[#1A6FA8]" />
            </div>
            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest">
              Reason for Visit
            </p>
          </div>
          <textarea
            placeholder="Describe your symptoms or reason for visit (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition placeholder:text-[#AAC2D4] focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
          />
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          text={
            loading ? <ButtonLoader text="Booking..." /> : "Confirm Appointment"
          }
        />
      </div>
    </div>
  );
};

export default AppointmentForm;
