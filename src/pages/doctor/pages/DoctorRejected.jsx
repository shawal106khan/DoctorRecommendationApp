import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/components/Button";
import { XCircle } from "lucide-react";

const RejectedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-red-100 shadow-[0_8px_32px_rgba(239,68,68,0.10)] p-10 text-center max-w-md w-full">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
          <XCircle size={28} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-[#0D2E4E] mb-2">
          Account Rejected
        </h2>
        <p className="text-sm text-[#6B839A] leading-relaxed mb-6">
          Unfortunately, your doctor account has been rejected by admin. You may
          resubmit your license for review.
        </p>
        <div className="flex flex-col gap-3">
          <Button
            text="Re-submit License"
            onClick={() => navigate("/signup/doctor-verification")}
          />
          <Button text="Go to Home" onClick={() => navigate("/")} />
        </div>
      </div>
    </div>
  );
};

export default RejectedPage;
