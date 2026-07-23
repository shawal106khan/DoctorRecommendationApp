import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../../services/authService";
import { getDoctorByUserId } from "../../../../../services/userService";
import { fetchDoctorVerificationStatus } from "../../../../../services/doctorService";
import LoadingSpinner from "../../../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../../../hooks/useLoading";
import { ShieldCheck, XCircle, Clock } from "lucide-react";
import { StepHeader } from "../../../../../components/common/components/StepComponents";

const VerificationStep = ({ onNext, onBack }) => {
  const [status, setStatus] = useState("pending");
  const { loading, stopLoading } = useLoading(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const userId = await getCurrentUser();
        const doctor = await getDoctorByUserId(userId);
        const nextStatus = await fetchDoctorVerificationStatus(
          doctor.doctors_id,
        );
        if (!mounted) return;
        setStatus(nextStatus);
      } catch {
        if (mounted) setStatus("pending");
      } finally {
        if (mounted) stopLoading();
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [stopLoading]);

  const statusConfig = {
    approved: {
      icon: ShieldCheck,
      bg: "bg-green-50 border-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      title: "Approved",
      titleColor: "text-green-700",
      desc: "Your medical license has been verified by our admin team.",
      descColor: "text-green-600",
    },
    rejected: {
      icon: XCircle,
      bg: "bg-red-50 border-red-100",
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      title: "Rejected",
      titleColor: "text-red-700",
      desc: "Your verification was rejected. Please contact support.",
      descColor: "text-red-600",
    },
    pending: {
      icon: Clock,
      bg: "bg-yellow-50 border-yellow-100",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      title: "Pending",
      titleColor: "text-yellow-700",
      desc: "Your verification is under review. Please wait.",
      descColor: "text-yellow-600",
    },
  };

  const cfg = statusConfig[status] || statusConfig.pending;
  const IconComp = cfg.icon;

  return (
    <div className="max-w-lg mx-auto px-2 py-4">
      <StepHeader
        title="Verification Status"
        subtitle="Your profile is verified by our admin team"
      />

      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <div
          className={`border rounded-2xl p-6 flex items-start gap-4 ${cfg.bg}`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}
          >
            <IconComp size={20} className={cfg.iconColor} />
          </div>
          <div>
            <p className={`font-bold text-sm mb-1 ${cfg.titleColor}`}>
              {cfg.title}
            </p>
            <p className={`text-xs leading-relaxed ${cfg.descColor}`}>
              {cfg.desc}
            </p>
          </div>
        </div>
      )}

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

export default VerificationStep;
