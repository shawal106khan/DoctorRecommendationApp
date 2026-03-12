import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = ({ children, role, loginPath }) => {
  const { user } = useAuth();

  if (!user) {
    const fallback =
      loginPath || (role === "admin" ? "/admin/login" : "/login");
    return <Navigate to={fallback} replace />;
  }

  // Logged in but wrong role → send to own dashboard
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
