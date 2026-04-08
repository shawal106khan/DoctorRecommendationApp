import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getCurrentUserProfile } from "../services/authService";
import { getAdminByUserId } from "../services/adminService";
import { getDoctorByUserId, getPatientByUserId } from "../services/userService";

const ProtectedRoute = ({ children, role, loginPath }) => {
  const { user } = useAuth();
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
      } catch (_) {
        if (active) setAuthorized(false);
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
    return <Navigate to={fallback} replace />;
  }

  if (checking) return null;

  // Logged in but not authorized for this role → send to role login
  if (role && !authorized) {
    const fallback =
      loginPath || (role === "admin" ? "/admin/login" : "/login");
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
