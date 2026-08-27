import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../../services/authService";
import { getDoctorByUserId } from "../../../../../services/userService";
import {
  fetchDoctorProfessionalInfo,
  fetchDoctorVerificationStatus,
} from "../../../../../services/doctorService";
import LoadingSpinner from "../../../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../../../hooks/useLoading";
import { StepHeader } from "../../../../../components/common/components/StepComponents";
import ButtonLoader from "../../../../../components/common/components/ButtonLoader";

const Section = ({ title, children }) => (
  <div className="mb-3 sm:mb-4 bg-white border border-[#D6E6F2] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(26,111,168,0.06)]">
    <div className="bg-[#F7FAFE] border-b border-[#D6E6F2] px-3.5 sm:px-4 py-2 sm:py-2.5">
      <p className="text-[11px] font-bold text-[#1A6FA8] uppercase tracking-widest">
        {title}
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#EEF5FC] p-px rounded-b-2xl overflow-hidden">
      {children}
    </div>
  </div>
);

const Item = ({ label, value, isLink }) => (
  <div className="bg-white px-3.5 sm:px-4 py-2 sm:py-3">
    <p className="text-[9px] sm:text-[10px] font-semibold text-[#4A6680] uppercase tracking-wide mb-0.5">
      {label}
    </p>
    {isLink && value ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-[#1A6FA8] underline font-medium"
      >
        View on Map
      </a>
    ) : (
      <p className="text-sm font-semibold text-[#0D2E4E] break-words">
        {value || <span className="text-[#AAC2D4] font-normal">—</span>}
      </p>
    )}
  </div>
);

const ReviewStep = ({ profile, onBack, onFinish }) => {
  const { loading, stopLoading } = useLoading(true);
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
        if (mounted) stopLoading();
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [stopLoading]);

  const statusBadge = {
    approved: "bg-green-50 border border-green-100 text-green-700",
    rejected: "bg-red-50 border border-red-100 text-red-700",
    pending: "bg-yellow-50 border border-yellow-100 text-yellow-700",
  };

  return (
    <div className="max-w-lg mx-auto px-1 sm:px-2 py-3 sm:py-4">
      <StepHeader
        title="Review Your Profile"
        subtitle="Please review your information carefully before finishing."
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Section title="Basic Information">
            <Item label="About" value={profile?.bio} />
            <Item label="Languages" value={profile?.languages?.join(", ")} />
          </Section>

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
            <Item
              label="Consultation Fee"
              value={
                profInfo?.consultation_fee
                  ? `PKR ${profInfo.consultation_fee}`
                  : null
              }
            />
          </Section>

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
                  : "—"
              }
            />
            <Item
              label="Slot Duration"
              value={
                profile?.slotDuration ? `${profile.slotDuration} minutes` : "—"
              }
            />
          </Section>

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

          {/* Verification */}
          <div className="mb-4">
            <p className="text-[11px] font-bold text-[#4A6680] uppercase tracking-widest mb-2">
              Verification Status
            </p>
            <span
              className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full capitalize ${statusBadge[verificationStatus] || statusBadge.pending}`}
            >
              {verificationStatus}
            </span>
          </div>
        </>
      )}

      <div className="mt-6 sm:mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#4A6680] hover:text-[#1A6FA8] transition"
        >
          ← Back
        </button>
        <button
          disabled={loading}
          onClick={onFinish}
          className="px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {loading ? <ButtonLoader text="Loading..." /> : "Go to Dashboard"}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
