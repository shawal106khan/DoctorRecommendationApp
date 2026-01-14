import { useState } from "react";
import { Camera, LogOut } from "lucide-react";
import { useAuth } from "../../context/useAuth";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [image, setImage] = useState(user?.avatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImage(preview);

    // later → upload to Firebase Storage
  };

  const handleLogout = () => {
    setUser(null);
    // later → Firebase Auth signOut
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-50 rounded-md mt-20 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-00 mb-6 text-center">
        My Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={image || "/src/assets/profile-pictur.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer">
            <Camera size={16} className="text-white" />
            <input
              type="file"
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
