import { Navigate, useLocation } from "react-router-dom"; // ✅ add useLocation
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getCurrentUserProfile } from "../services/authService";
import { getAdminByUserId } from "../services/adminService";
import { getDoctorByUserId, getPatientByUserId } from "../services/userService";

const ProtectedRoute = ({ children, role, loginPath }) => {
  const { user } = useAuth();
  const location = useLocation(); // ✅
  const [checking, setChecking] = useState(!!role);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!role) {
      setChecking(false);
      setAuthorized(true);
      return;
    }

    let active = true;
    const run = async () => {
      try {
        const authUser = await getCurrentUserProfile();
        if (!authUser?.id) throw new Error("No session");

        if (role === "admin") {
          await getAdminByUserId(authUser.id);
        } else if (role === "doctor") {
          await getDoctorByUserId(authUser.id);
        } else if (role === "patient") {
          await getPatientByUserId(authUser.id);
        }

        if (active) setAuthorized(true);
      } catch (err) {
        if (active) setAuthorized(false);
        console.log("Authorization check failed:", err.message);
      } finally {
        if (active) setChecking(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [role]);

  if (!user) {
    const fallback =
      loginPath || (role === "admin" ? "/admin/login" : "/login");
    return (
      <Navigate to={`${fallback}?redirect=${location.pathname}`} replace />
    ); // ✅
  }

  if (checking) return null;

  if (role && !authorized) {
    const fallback =
      loginPath || (role === "admin" ? "/admin/login" : "/login");
    return (
      <Navigate to={`${fallback}?redirect=${location.pathname}`} replace />
    ); // ✅
  }

  return children;
};

export default ProtectedRoute;
