import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const DoctorRedirect = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // 🔴 Not approved
    if (!user.isApproved) {
      navigate("/doctor/pending-approval", { replace: true });
      return;
    }

    // 🟢 Approved – show once
    if (user.isApproved && !user.approvalNotified) {
      setUser((prev) => ({
        ...prev,
        approvalNotified: true,
      }));

      navigate("/doctor/approved", { replace: true });
      return;
    }

    // 🟡 Profile incomplete
    if (!user.profileCompleted) {
      navigate("/doctor/complete-profile", { replace: true });
      return;
    }

    // 🟢 All done
    navigate("/doctor/dashboard", { replace: true });
  }, [user, navigate, setUser]);

  return null;
};

export default DoctorRedirect;
