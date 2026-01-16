import { useState } from "react";
import { Camera, LogOut, ArrowLeft, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.avatar || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
  };

  const handleSave = () => {
    setUser({
      ...user,
      name,
      avatar: image,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleBack = () => {
    navigate(`/${user.role}/dashboard`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-300rounded-xl mt-20 shadow-lg">
      {/* Back */}
      <button
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-blue-100"
      >
        <ArrowLeft size={22} className="text-blue-600" />
      </button>

      <h2 className="text-xl font-semibold text-gray-900 text-center pb-6 font-heading">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-4 ">
        <div className="relative">
          <img
            src={image || "/src/assets/profile-pictur.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
              <Camera size={16} className="text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
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
            className="border px-3 py-2 rounded-lg text-center"
          />
        ) : (
          <h3 className="font-semibold text-lg">{user?.name}</h3>
        )}

        <span className="text-sm text-gray-500 capitalize">{user?.role}</span>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full border border-slate-400 py-3 rounded-lg hover:bg-gray-300 hover:text-black bg-blue-600 text-white"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              <Save size={18} />
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}

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
