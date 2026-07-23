import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const AccountDeleted = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F9FD] px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-red-100 p-10 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
          <Trash2 className="text-red-600" size={40} />
        </div>

        <h1 className="text-2xl font-bold text-[#0D2E4E] mb-3">
          Account Deleted
        </h1>

        <p className="text-[#6B839A] text-sm leading-relaxed mb-6">
          Your account has been permanently deleted by the administrator.
          <br />
          Please contact support for further information.
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AccountDeleted;
