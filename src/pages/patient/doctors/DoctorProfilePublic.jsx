import { useParams } from "react-router-dom";
import { getDoctors } from "../../../store/doctorStore";
import ProfileHeader from "../../doctor/pages/profile/components/ProfileHeader";
import ProfileSection from "../../doctor/pages/profile/components/ProfileSection";

const DoctorProfilePublic = () => {
  const { doctorId } = useParams();

  const doctor = getDoctors().find((d) => String(d.id) === String(doctorId));

  if (!doctor) return <p>Doctor not found</p>;

  const profile = doctor.profile || {};

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ProfileHeader user={doctor} hideEdit />

      <ProfileSection title="About">
        <p>{profile.bio}</p>
      </ProfileSection>

      <ProfileSection title="Professional Details">
        <p>Specialization: {doctor.specialization}</p>
        <p>Experience: {doctor.experienceYears} years</p>
        <p>Qualification: {doctor.qualification}</p>
        <p>Hospital: {doctor.hospitalName}</p>
      </ProfileSection>

      <ProfileSection title="Availability">
        <p>{profile.availableDays?.join(", ")}</p>
        <p>
          {profile.startTime} - {profile.endTime}
        </p>
      </ProfileSection>

      <ProfileSection title="Clinic Location">
        <p>{profile.clinicName}</p>
        <p>{profile.address}</p>
        <p>{profile.city}</p>
      </ProfileSection>

      <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg">
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorProfilePublic;
