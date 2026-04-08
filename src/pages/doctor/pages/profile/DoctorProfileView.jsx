import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/useAuth";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSection from "./components/ProfileSection";
import { getCurrentUser } from "../../../../services/authService";
import { getDoctorByUserId } from "../../../../services/userService";
import {
  fetchDoctorAvailability,
  fetchDoctorLocation,
  fetchDoctorProfessionalInfo,
  fetchDoctorProfileBasic,
} from "../../../../services/doctorService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import { buildDoctorHeaderUser } from "../../../../services/doctorService";
import { formatAvailability } from "../../../../utils/availabilityFormat";

const DoctorProfileView = ({ onEdit }) => {
  const { user, doctorProfile, setDoctorProfile } = useAuth();

  const [basicInfo, setBasicInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { days, time, slot } = formatAvailability(availabilityInfo);

  useEffect(() => {
    const load = async () => {
      try {
        if (doctorProfile) {
          setBasicInfo(doctorProfile.basic);
          setProfessionalInfo(doctorProfile.professional);
          setAvailabilityInfo(doctorProfile.availability);
          setLocationInfo(doctorProfile.location);
          setLoading(false);
          return;
        }

        const userId = await getCurrentUser();
        const doctor = await getDoctorByUserId(userId);

        const [basic, professional, availability, location] = await Promise.all(
          [
            fetchDoctorProfileBasic(doctor.doctors_id),
            fetchDoctorProfessionalInfo(userId),
            fetchDoctorAvailability(doctor.doctors_id),
            fetchDoctorLocation(doctor.doctors_id),
          ],
        );

        setBasicInfo(basic);
        setProfessionalInfo(professional);
        setAvailabilityInfo(availability);
        setLocationInfo(location);

        // ✅ cache for next time
        setDoctorProfile({
          basic,
          professional,
          availability,
          location,
        });
      } catch (err) {
        alert("Failed to load profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [doctorProfile, setDoctorProfile]);

  const headerUser = buildDoctorHeaderUser({
    user,
    professionalInfo,
    avatarUrl: user?.avatar,
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-serif">
      {loading ? (
        <LoadingSpinner text="Loading profile..." />
      ) : (
        <div>
          <ProfileHeader user={headerUser} onEdit={onEdit} />

          {/* About */}
          <ProfileSection title="About">
            <p className="text-sm text-gray-600 leading-relaxed ">
              {basicInfo?.doctor_bio || "No bio added yet."}
            </p>
          </ProfileSection>

          {/* Professional Info */}
          <ProfileSection title="Professional Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <Info
                label="Specialization"
                value={professionalInfo?.specializationName}
              />
              <Info
                label="Experience"
                value={`${professionalInfo?.experience_years || 0} years`}
              />
              <Info
                label="Qualification"
                value={professionalInfo?.qualifications}
              />

              <Info
                label="License No"
                value={professionalInfo?.license_number}
              />
              <Info label="Phone" value={professionalInfo?.phone_number} />
            </div>
          </ProfileSection>

          {/* Availability */}
          <ProfileSection title="Availability">
            <div className="text-sm text-gray-500 mt-1">
              <p>{days}</p>
              <p>
                {time} • {slot}
              </p>
            </div>
          </ProfileSection>

          {/* Location */}
          <ProfileSection title="Hospital Location">
            <p className="text-base text-gray-700">
              {locationInfo?.hospital_name}, {locationInfo?.address},{" "}
              {locationInfo?.city}, {locationInfo?.landmark}
            </p>
            {locationInfo?.google_maps_link && (
              <a
                href={locationInfo.google_maps_link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 text-sm text-blue-600 underline"
              >
                View on Google Maps
              </a>
            )}
          </ProfileSection>
        </div>
      )}
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
