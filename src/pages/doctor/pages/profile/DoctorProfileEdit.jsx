import { useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import ProfileSection from "./components/ProfileSection";
import AvatarUpload from "../../../../components/common/components/AvatarUpload";
import Input from "../../../../components/common/components/Input";
import { dayToNumber, numberToDay } from "../../../../utils/dayMap";
import {
  getCurrentUserId,
  getDoctorIdByUser,
  updateDoctorProfileFromEdit,
} from "../../../../services/doctorService";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DoctorProfileEdit = ({ onCancel }) => {
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
  };

  const [form, setForm] = useState({
    avatar: profile.avatar || null,
    avatarFile: null,

    bio: profile.bio || "",
    clinicName: profile.clinicName || "",
    address: profile.address || "",
    city: profile.city || "",
    mapLink: profile.mapLink || "", // ✅ ADD
    availableDays: profile.availableDays || [],
    startTime: profile.startTime || "",
    endTime: profile.endTime || "",
    slotDuration: profile.slotDuration || 15,
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

    const userId = await getCurrentUserId();
    const doctorsId = await getDoctorIdByUser(userId);
    const result = await updateDoctorProfileFromEdit(doctorsId, userId, form);

    setDoctorProfile({
      basic: { doctor_bio: form.bio, language: "" },
      professional: doctorProfile?.professional || null,
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

    // const updatedDoctor = {
    //   id: user.id,
    //   name: user.name,
    //   specialization: user.specialization,
    //   experienceYears: user.experienceYears,
    //   qualification: user.qualification,
    //   hospitalName: user.hospitalName,
    //   phone: user.phone,
    //   avatar: form.avatar ?? user.avatar,

    //   profile: {
    //     bio: form.bio,
    //     clinicName: form.clinicName,
    //     address: form.address,
    //     city: form.city,
    //     mapLink: form.mapLink,
    //     availableDays: form.availableDays,
    //     startTime: form.startTime,
    //     endTime: form.endTime,
    //     slotDuration: form.slotDuration,
    //   },

    //   verified: true, // admin will control later
    // };

    // saveDoctor(updatedDoctor);
    onCancel();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-serif">
      <ProfileSection title="Profile Photo">
        <AvatarUpload
          image={form.avatar}
          onChange={(file) => {
            const preview = URL.createObjectURL(file);
            update("avatar", preview); // STRING ONLY
            update("avatarFile", file);
          }}
        />
      </ProfileSection>

      <ProfileSection title="Edit Profile">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
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

          <div className="col-span-full">
            <label className="block text-xs text-gray-600 mb-1">
              About Doctor
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border rounded-md shadow-lg
                         text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Availability */}
          <div className="col-span-full space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Availability Days
            </p>

            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1 rounded-full text-xs border ${
                    form.availableDays.includes(day)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

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
            label="Slot Duration (minutes)"
            type="number"
            value={form.slotDuration}
            onChange={(e) => update("slotDuration", e.target.value)}
          />

          <div className="col-span-full flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </ProfileSection>
    </div>
  );
};

export default DoctorProfileEdit;
