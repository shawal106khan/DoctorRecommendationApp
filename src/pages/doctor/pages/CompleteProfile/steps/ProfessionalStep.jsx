import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../../services/authService";
import { fetchDoctorProfessionalInfo } from "../../../../../services/doctorService";
import LoadingSpinner from "../../../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../../../hooks/useLoading";
import { StepHeader } from "../../../../../components/common/components/StepComponents";

const Info = ({ label, value }) => (
  <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3">
    <p className="text-[9px] sm:text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-0.5">
      {label}
    </p>
    <p className="text-sm font-semibold text-[#0D2E4E] break-words">
      {value || (
        <span className="text-[#AAC2D4] font-normal text-xs">Not provided</span>
      )}
    </p>
  </div>
);

const ProfessionalStep = ({ onNext, onBack }) => {
  const [info, setInfo] = useState(null);
  const { loading, stopLoading } = useLoading(true);

  useEffect(() => {
    const load = async () => {
      try {
        const userId = await getCurrentUser();
        const data = await fetchDoctorProfessionalInfo(userId);
        setInfo(data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };
    load();
  }, [stopLoading]);

  return (
    <div className="max-w-lg mx-auto px-1 sm:px-2 py-3 sm:py-4">
      <StepHeader
        title="Professional Information"
        subtitle="These details were provided during signup and verified by admin."
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Info label="Specialization" value={info?.specializationName} />
          <Info
            label="Experience"
            value={
              info?.experience_years ? `${info.experience_years} years` : null
            }
          />
          <Info label="Qualification" value={info?.qualifications} />
          <Info label="License Number" value={info?.license_number} />
          <Info label="Phone" value={info?.phone_number} />
        </div>
      )}

      <div className="mt-6 sm:mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#4A6680] hover:text-[#1A6FA8] transition"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ProfessionalStep;
