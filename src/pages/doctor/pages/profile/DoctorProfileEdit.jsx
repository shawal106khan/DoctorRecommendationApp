import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import ProfileSection from "./components/ProfileSection";
import AvatarUpload from "../../../../components/common/components/AvatarUpload";
import Input from "../../../../components/common/components/Input";
import { dayToNumber, numberToDay } from "../../../../utils/dayMap";
import {
  getCurrentUserId,
  getDoctorIdByUser,
  saveDoctorFee,
  updateDoctorProfileFromEdit,
} from "../../../../services/doctorService";
import { Save, X } from "lucide-react";
import BackButton from "../../../../components/common/components/BackButton";
import { useLoading } from "../../../../hooks/useLoading";
import ButtonLoader from "../../../../components/common/components/ButtonLoader";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DoctorProfileEdit = ({ onCancel }) => {
  const { loading, startLoading, stopLoading } = useLoading(false);
  const { user, setUser, doctorProfile, setDoctorProfile } = useAuth();
  const initial = doctorProfile || {};
  const profile = {
    avatar: user?.avatar,
    bio: initial.basic?.doctor_bio || "",
    clinicName: initial.location?.hospital_name || "",
    address: initial.location?.address || "",
    city: initial.location?.city || "",
    mapLink: initial.location?.google_maps_link || "",
    availableDays:
      initial.availability?.map((a) => numberToDay[a.day_of_week]) || [],
    startTime: initial.availability?.[0]?.start_time || "",
    endTime: initial.availability?.[0]?.end_time || "",
    slotDuration: initial.availability?.[0]?.slot_duration_minutes || 15,
    experienceYears: initial.professional?.experience_years || "",

    qualification: initial.professional?.qualifications || "",
  };

  const [form, setForm] = useState({
    avatar: profile.avatar || null,
    avatarFile: null,
    bio: profile.bio || "",
    clinicName: profile.clinicName || "",
    address: profile.address || "",
    city: profile.city || "",
    mapLink: profile.mapLink || "",
    availableDays: profile.availableDays || [],
    startTime: profile.startTime || "",
    endTime: profile.endTime || "",
    slotDuration: profile.slotDuration || "",
    consultationFee: initial.professional?.consultation_fee || "",
    experienceYears: initial.professional?.experience_years || "",

    qualification: initial.professional?.qualifications || "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleDay = (day) => {
    update(
      "availableDays",
      form.availableDays.includes(day)
        ? form.availableDays.filter((d) => d !== day)
        : [...form.availableDays, day],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const userId = await getCurrentUserId();
      const doctorsId = await getDoctorIdByUser(userId);
      const result = await updateDoctorProfileFromEdit(doctorsId, userId, form);
      await saveDoctorFee(doctorsId, form.consultationFee);
      setDoctorProfile({
        basic: { doctor_bio: form.bio, language: "" },
        professional: {
          ...(doctorProfile?.professional || null),

          consultation_fee: form.consultationFee,

          experience_years: form.experienceYears,

          qualifications: form.qualification,
        },
        availability: form.availableDays.map((d) => ({
          day_of_week: dayToNumber[d],
          start_time: form.startTime,
          end_time: form.endTime,
          slot_duration_minutes: form.slotDuration,
        })),
        location: {
          hospital_name: form.clinicName,
          address: form.address,
          city: form.city,
          google_maps_link: form.mapLink,
        },
      });
      setUser((prev) => ({
        ...prev,
        avatar: result.profilePicUrl || prev?.avatar || null,
      }));
      onCancel();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="m-4">
        <BackButton to="/doctor/dashboard" />
      </div>
      {/* Avatar */}
      <ProfileSection title="Profile Photo">
        <AvatarUpload
          image={form.avatar}
          onChange={(file) => {
            const preview = URL.createObjectURL(file);
            update("avatar", preview);
            update("avatarFile", file);
          }}
        />
      </ProfileSection>

      {/* Form */}
      <ProfileSection title="Edit Profile">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Clinic Name"
              value={form.clinicName}
              onChange={(e) => update("clinicName", e.target.value)}
            />
            <Input
              label="City"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
            <Input
              label="Address"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
            <Input
              label="Google Maps Link"
              placeholder="https://maps.google.com/..."
              value={form.mapLink}
              onChange={(e) => update("mapLink", e.target.value)}
            />
            <Input
              label="Experience Years"
              type="number"
              value={form.experienceYears}
              onChange={(e) => update("experienceYears", e.target.value)}
            />

            <Input
              label="Qualification"
              value={form.qualification}
              onChange={(e) => update("qualification", e.target.value)}
            />
            <Input
              label="Consultation Fee (PKR)" // ✅
              type="number"
              value={form.consultationFee}
              onChange={(e) => update("consultationFee", e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1.5">
              About Doctor
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition placeholder:text-[#AAC2D4] focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-2">
              Availability Days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all ${
                    form.availableDays.includes(day)
                      ? "bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white border-[#1A6FA8] shadow-[0_2px_8px_rgba(26,111,168,0.30)]"
                      : "bg-[#F7FAFE] text-[#4A6680] border-[#D6E6F2] hover:border-[#1A6FA8]/40"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Start Time"
              type="time"
              value={form.startTime}
              onChange={(e) => update("startTime", e.target.value)}
            />
            <Input
              label="End Time"
              type="time"
              value={form.endTime}
              onChange={(e) => update("endTime", e.target.value)}
            />
            <Input
              label="Slot Duration (min)"
              type="number"
              value={form.slotDuration}
              onChange={(e) => update("slotDuration", e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] text-[#4A6680] text-sm font-semibold hover:bg-[#EEF5FC] transition"
            >
              <X size={14} /> Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {loading ? (
                <ButtonLoader text="Saving..." />
              ) : (
                <>
                  <Save size={14} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </ProfileSection>
    </div>
  );
};

export default DoctorProfileEdit;
