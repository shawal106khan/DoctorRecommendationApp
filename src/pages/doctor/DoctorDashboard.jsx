import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const DoctorDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear user
    navigate("/login"); // go back to login
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium
                     bg-red-500 text-white rounded-md
                     hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Doctor dashboard content */}
      <h1 className="mt-6 text-2xl font-semibold">Doctor Dashboard</h1>
    </div>
  );
};

export default DoctorDashboard;
