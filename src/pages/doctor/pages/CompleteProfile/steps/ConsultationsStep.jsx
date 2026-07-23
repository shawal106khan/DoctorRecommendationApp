import Input from "../../../../../components/common/components/Input";
import { StepHeader } from "../../../../../components/common/components/StepComponents";

const ConsultationStep = ({ profile, setProfile, onNext, onBack }) => {
  return (
    <div className="max-w-lg mx-auto px-2 py-4">
      <StepHeader title="Consultation Details" />

      <div className="space-y-1">
        <Input
          label="Consultation Fee (PKR)"
          type="number"
          placeholder="Enter consultation fee"
          value={profile.consultationFee}
          onChange={(e) =>
            setProfile({ ...profile, consultationFee: e.target.value })
          }
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
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

export default ConsultationStep;
