import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { supabase } from "../../../lib/supabase";
import { getCurrentUser } from "../../../services/authService";
import { getDoctorByUserId } from "../../../services/userService";
import { fetchDoctorsTopbarInfo } from "../../../services/doctorService";

const DoctorRedirect = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const userId = await getCurrentUser();
        console.log("Auth user id:", userId);
        const doctor = await getDoctorByUserId(userId);
        console.log("Doctor row:", doctor);
        const { data: verification } = await supabase
          .from("doctor-license-verifications")
          .select("verified, verification_status")
          .eq("doctors_id", doctor.doctors_id)
          .order("uploaded_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        const isRejected = verification?.verification_status === "rejected";
        const isApproved =
          verification?.verified === true ||
          verification?.verification_status === "approved";
        // keep context in sync
        const TopbarInfo = await fetchDoctorsTopbarInfo(doctor.doctors_id);
        setUser((prev) => ({
          ...doctor,
          role: "doctor",
          name: doctor.name,
          avatar: TopbarInfo?.avatarUrl || prev?.avatar || null,
        }));

        if (isRejected) {
          navigate("/doctor/rejected", { replace: true });
          return;
        }

        if (!isApproved) {
          navigate("/doctor/pending-approval", { replace: true });
          return;
        }

        if (!doctor.profile_completed) {
          navigate("/doctor/approvedSuccess", { replace: true });
          return;
        }
        navigate("/doctor/dashboard", { replace: true });
      } catch (err) {
        alert(err.message);
      }
    };

    run();
  }, [navigate, setUser, user]);

  return null;
};

export default DoctorRedirect;
