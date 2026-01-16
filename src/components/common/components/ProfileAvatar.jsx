import { useState, useEffect } from "react";
import { Camera, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState(user?.avatar);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setImage(objectUrl);

    // later → upload to Firebase Storage
  };

  // 🔹 CLEANUP (VERY IMPORTANT)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    // later → Firebase Auth signOut()
  };

  const handleBack = () => {
    if (user?.role === "patient") {
      navigate("/patient/dashboard");
    } else if (user?.role === "doctor") {
      navigate("/doctor/dashboard");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-50 rounded-xl mt-20 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={image || "/src/assets/profile-pictur.png"}
            alt="Profile"
            className={`w-28 h-28 rounded-full object-cover border
    ${preview ? "ring-4 ring-blue-400 shadow-lg" : ""}`}
          />

          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
            <Camera size={16} className="text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <h3 className="font-semibold text-lg">{user?.name}</h3>
        <span className="text-sm text-gray-500 capitalize">{user?.role}</span>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleBack}
          className="w-full flex items-center justify-center gap-2
          border py-3 rounded-lg hover:bg-blue-100"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <button className="w-full border py-3 rounded-lg hover:bg-gray-200">
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2
          text-red-500 border border-red-300 py-3 rounded-lg hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
