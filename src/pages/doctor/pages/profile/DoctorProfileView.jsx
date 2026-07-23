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
  buildDoctorHeaderUser,
} from "../../../../services/doctorService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import { formatAvailability } from "../../../../utils/availabilityFormat";
import { useLoading } from "../../../../hooks/useLoading";
import { MapPin, ExternalLink } from "lucide-react";

const Info = ({ label, value }) => (
  <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-3">
    <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-0.5">
      {label}
    </p>
    <p className="text-sm font-semibold text-[#0D2E4E]">{value || "—"}</p>
  </div>
);

const DoctorProfileView = ({ onEdit }) => {
  const { user, doctorProfile, setDoctorProfile } = useAuth();
  const [basicInfo, setBasicInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [availabilityInfo, setAvailabilityInfo] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const { loading, stopLoading } = useLoading(true);
  const { days, time, slot } = formatAvailability(availabilityInfo);

  useEffect(() => {
    const load = async () => {
      try {
        if (doctorProfile) {
          setBasicInfo(doctorProfile.basic);
          setProfessionalInfo(doctorProfile.professional);
          setAvailabilityInfo(doctorProfile.availability);
          setLocationInfo(doctorProfile.location);
          stopLoading();
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
        setDoctorProfile({ basic, professional, availability, location });
      } catch (err) {
        alert("Failed to load profile: " + err.message);
      } finally {
        stopLoading();
      }
    };
    load();
  }, [doctorProfile, setDoctorProfile, stopLoading]);

  const headerUser = buildDoctorHeaderUser({
    user,
    professionalInfo,
    avatarUrl: user?.avatar,
  });

  if (loading)
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <ProfileHeader user={headerUser} onEdit={onEdit} />

      {/* About */}
      <ProfileSection title="About">
        <p className="text-sm text-[#6B839A] leading-relaxed">
          {basicInfo?.doctor_bio || "No bio added yet."}
        </p>
      </ProfileSection>

      {/* Professional */}
      <ProfileSection title="Professional Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <Info label="License No" value={professionalInfo?.license_number} />
          <Info label="Phone" value={professionalInfo?.phone_number} />
          <Info
            label="Consultation Fee"
            value={
              professionalInfo?.consultation_fee
                ? `PKR ${professionalInfo.consultation_fee}`
                : "Not set"
            }
          />
        </div>
      </ProfileSection>

      {/* Availability */}
      <ProfileSection title="Availability">
        <div className="flex flex-wrap gap-2 mb-3">
          {days?.split(", ").map((day) => (
            <span
              key={day}
              className="bg-[#E8F4FD] text-[#1A6FA8] text-[11px] font-bold px-3 py-1 rounded-full"
            >
              {day}
            </span>
          ))}
        </div>
        <p className="text-sm text-[#6B839A]">
          {time} &nbsp;·&nbsp; {slot}
        </p>
      </ProfileSection>

      {/* Location */}
      <ProfileSection title="Hospital Location">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8F4FD] flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin size={16} className="text-[#1A6FA8]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0D2E4E]">
              {locationInfo?.hospital_name}
            </p>
            <p className="text-xs text-[#6B839A] mt-0.5">
              {locationInfo?.address}, {locationInfo?.city}
              {locationInfo?.landmark ? `, ${locationInfo.landmark}` : ""}
            </p>
            {locationInfo?.google_maps_link && (
              <a
                href={locationInfo.google_maps_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs text-[#1A6FA8] font-semibold hover:underline"
              >
                <ExternalLink size={11} />
                View on Google Maps
              </a>
            )}
          </div>
        </div>
      </ProfileSection>
    </div>
  );
};

export default DoctorProfileView;
