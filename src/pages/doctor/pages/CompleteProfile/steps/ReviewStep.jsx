import { useEffect, useState } from "react";
import Button from "../../../../../components/common/components/Button";
import Title from "../../../../../components/common/components/Title";
import { getCurrentUser } from "../../../../../services/authService";
import { getDoctorByUserId } from "../../../../../services/userService";
import {
  fetchDoctorProfessionalInfo,
  fetchDoctorVerificationStatus,
} from "../../../../../services/doctorService";
import LoadingSpinner from "../../../../../components/common/components/LoadingSpinner";

const ReviewStep = ({ profile, onBack, onFinish }) => {
  const [loading, setLoading] = useState(true);
  const [profInfo, setProfInfo] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("pending");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const userId = await getCurrentUser();
        const doctor = await getDoctorByUserId(userId);

        const [prof, status] = await Promise.all([
          fetchDoctorProfessionalInfo(userId),
          fetchDoctorVerificationStatus(doctor.doctors_id),
        ]);

        if (!mounted) return;
        setProfInfo(prof);
        setVerificationStatus(status);
      } catch {
        // keep defaults
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-5">
      <Title
        heading="Review Your Profile"
        subheading="Please review your information carefully before finishing."
      />

      {loading ? (
        <LoadingSpinner text="Loading review data..." />
      ) : (
        <>
          {/* BASIC INFO (LOCAL STATE) */}
          <Section title="Basic Information">
            <Item label="About" value={profile?.bio} />
            <Item label="Languages" value={profile?.languages?.join(", ")} />
          </Section>

          {/* PROFESSIONAL INFO (FROM SIGNUP) */}
          <Section title="Professional Information">
            <Item label="Specialization" value={profInfo?.specializationName} />
            <Item
              label="Experience"
              value={
                profInfo?.experience_years
                  ? `${profInfo.experience_years} years`
                  : null
              }
            />
            <Item label="Qualification" value={profInfo?.qualifications} />
            <Item label="License Number" value={profInfo?.license_number} />
            <Item label="Phone" value={profInfo?.phone_number} />
          </Section>

          {/* AVAILABILITY (LOCAL STATE) */}
          <Section title="Availability">
            <Item
              label="Available Days"
              value={profile?.availableDays?.join(", ")}
            />
            <Item
              label="Time"
              value={
                profile?.startTime && profile?.endTime
                  ? `${profile.startTime} - ${profile.endTime}`
                  : "�"
              }
            />
            <Item
              label="Slot Duration"
              value={
                profile?.slotDuration ? `${profile.slotDuration} minutes` : "�"
              }
            />
          </Section>

          {/* LOCATION (LOCAL STATE) */}
          <Section title="Clinic Location">
            <Item
              label="Clinic Name"
              value={profile?.hospitalName || profile?.clinicName}
            />
            <Item label="Address" value={profile?.address} />
            <Item label="City" value={profile?.city} />
            <Item label="Landmark" value={profile?.landmark} />
            <Item label="Google Maps" value={profile?.mapLink} isLink />
          </Section>

          {/* VERIFICATION */}
          <Section title="Verification Status">
            {verificationStatus === "approved" ? (
              <span className="inline-block px-2 text-center py-2 text-sm rounded-lg bg-green-100 text-green-800 font-body">
                Approved
              </span>
            ) : verificationStatus === "rejected" ? (
              <span className="inline-block px-2 text-center py-2 text-sm rounded-lg bg-red-100 text-red-800 font-body">
                Rejected
              </span>
            ) : (
              <span className="inline-block px-2 text-center py-2 text-sm rounded-lg bg-yellow-100 text-yellow-800 font-body">
                Pending
              </span>
            )}
          </Section>
        </>
      )}

      {/* ACTIONS */}
      <div className="mt-8 flex justify-between text-sm">
        <span
          onClick={onBack}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        >
          Back
        </span>

        <span
          onClick={onFinish}
          className="cursor-pointer bg-blue-600 py-2 px-5 
           border border-gray-400 rounded-lg text-white
            font-medium hover:underline"
        >
          Go to Dashboard
        </span>
      </div>
    </div>
  );
};

export default ReviewStep;

const Section = ({ title, children }) => (
  <div className="mb-6 border rounded-lg p-4">
    <h3 className="font-semibold mb-3 text-sm text-gray-600 font-body">
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-4 text-gray-700 text-xs font-body">
      {children}
    </div>
  </div>
);

const Item = ({ label, value, isLink }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    {isLink && value ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-blue-600 underline"
      >
        View on Map
      </a>
    ) : (
      <p className="font-medium">{value || "�"}</p>
    )}
  </div>
);
