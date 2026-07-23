import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/components/Button";
import { CheckCircle2 } from "lucide-react";

const ApprovedSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_8px_32px_rgba(26,111,168,0.12)] p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#38B2A0] flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(26,111,168,0.30)]">
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h2 className="text-xl font-bold text-[#0D2E4E] mb-2">
          You're Approved!
        </h2>
        <p className="text-sm text-[#6B839A] leading-relaxed mb-6">
          Your doctor account has been verified. Complete your profile to become
          visible to patients.
        </p>
        <Button
          text="Continue"
          onClick={() => navigate("/doctor/complete-profile")}
        />
      </div>
    </div>
  );
};

export default ApprovedSuccess;
