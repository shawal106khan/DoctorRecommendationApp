import { useAuth } from "../../../../context/useAuth";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSection from "./components/ProfileSection";

const DoctorProfileView = ({ onEdit }) => {
  const { user } = useAuth();
  const profile = user?.profile || {};

  const formatTime = (time) => {
    if (!time) return "—";
    const [h, m] = time.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formatted = hour % 12 || 12;
    return `${formatted}:${m} ${suffix}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-serif">
      <ProfileHeader user={user} onEdit={onEdit} />

      {/* About */}
      <ProfileSection title="About">
        <p className="text-sm text-gray-600 leading-relaxed ">
          {profile.bio || "No bio added yet."}
        </p>
      </ProfileSection>

      {/* Professional Info */}
      <ProfileSection title="Professional Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <Info label="Specialization" value={user?.specialization} />
          <Info
            label="Experience"
            value={`${user?.experienceYears || 0} years`}
          />
          <Info label="Qualification" value={user?.qualification} />
          <Info label="Hospital" value={user?.hospitalName} />
          <Info label="License No" value={user?.licenseNumber} />
          <Info label="Phone" value={user?.phone} />
        </div>
      </ProfileSection>

      {/* Availability */}
      <ProfileSection title="Availability">
        <p className="text-base text-gray-700">
          {profile.availableDays?.length
            ? profile.availableDays.join(", ")
            : "—"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {formatTime(profile.startTime)} – {formatTime(profile.endTime)} •{" "}
          {profile.slotDuration || "—"} mins
        </p>
      </ProfileSection>

      {/* Location */}
      <ProfileSection title="Clinic Location">
        <p className="text-base text-gray-700">{profile.clinicName}</p>
        <p className="text-sm text-gray-500 ">{profile.address}</p>
        <p className="text-sm text-gray-500 ">{profile.city}</p>
      </ProfileSection>
    </div>
  );
};

export default DoctorProfileView;

const Info = ({ label, value }) => (
  <div className="space-y-1 font-serif">
    <p className="text-sm text-gray-800">{label}</p>
    <p className="text-sm font-medium text-gray-500">{value || "—"}</p>
  </div>
);
