import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { getDoctorById, saveDoctor } from "../../../store/doctorStore";

const DoctorRedirect = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // 🔹 Fetch latest doctor info
    const doctor = getDoctorById(user.email);

    if (!doctor) {
      alert("Doctor not found.");
      navigate("/login", { replace: true });
      return;
    }

    // 🔹 Ensure doctor has role
    const doctorWithRole = { ...doctor, role: "doctor" };
    setUser(doctorWithRole);

    // 🔴 Not approved → Pending page
    if (!doctorWithRole.isApproved) {
      navigate("/doctor/pending-approval", { replace: true });
      return;
    }

    // 🟢 Approved – show once
    if (doctorWithRole.isApproved && !doctorWithRole.approvalNotified) {
      const updated = { ...doctorWithRole, approvalNotified: true };
      saveDoctor(updated);
      setUser(updated);
      navigate("/doctor/approved", { replace: true });
      return;
    }

    // 🟡 Profile incomplete
    if (!doctorWithRole.profileCompleted) {
      navigate("/doctor/complete-profile", { replace: true });
      return;
    }

    // 🟢 All done
    navigate("/doctor/dashboard", { replace: true });
  }, [navigate, setUser, user]);

  return null;
};

export default DoctorRedirect;
