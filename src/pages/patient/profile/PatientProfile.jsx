import { useState } from "react";
import { Camera, LogOut, ArrowLeft, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const DEFAULT_AVATAR = "/src/assets/profile-pictur.png";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const PatientProfile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || DEFAULT_AVATAR);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    setAvatar(base64);

    // 🔐 single source of truth
    const updatedUser = {
      ...user,
      avatar: base64,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      avatar,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);
  };

  const handleBack = () => {
    navigate(`/${user.role}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      {/* Back */}
      <button
        onClick={handleBack}
        className="mb-4 p-2 rounded-full hover:bg-gray-100"
      >
        <ArrowLeft size={22} className="text-blue-600" />
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border shadow"
          />

          {isEditing && (
            <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Name */}
        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded-lg text-center"
          />
        ) : (
          <h3 className="text-lg font-semibold">{user?.name}</h3>
        )}

        <span className="text-sm text-gray-500 capitalize">{user?.role}</span>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              <Save size={18} /> Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg"
            >
              <X size={18} /> Cancel
            </button>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-500 py-3 rounded-lg hover:bg-red-50"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;
