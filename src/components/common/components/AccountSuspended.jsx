import { ShieldX } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const AccountSuspended = () => {
  const { logout, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const reason = location.state?.reason;
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F9FD] px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-10 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
          <ShieldX className="text-red-600" size={40} />
        </div>

        <h1 className="text-2xl font-bold text-[#0D2E4E] mb-3">
          Account Suspended
        </h1>
        <p className="text-[#6B839A] text-sm leading-relaxed mb-6">
          Your account has been temporarily suspended by the administrator.
          <br />
          Please contact support for further information.
        </p>

        {reason && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-red-700">
              Suspension Reason
            </p>

            <p className="text-sm text-red-600 mt-1">{reason}</p>
          </div>
        )}

        {user?.suspension_reason && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-red-600 uppercase mb-1">
              Suspension Reason
            </p>

            <p className="text-sm text-red-700">{user.suspension_reason}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSuspended;
