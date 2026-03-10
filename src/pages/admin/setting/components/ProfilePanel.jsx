import { useEffect, useState } from "react";
import AvatarUpload from "../../../../components/common/components/AvatarUpload";
import {
  getAdminProfile,
  updateAdminProfile,
} from "./../services/adminSettingsService";
import { useAuth } from "../../../../context/useAuth";
const ProfilePanel = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  useEffect(() => {
    const loadProfile = async () => {
      const data = await getAdminProfile();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (file) => {
    if (!file) return;

    // Convert to base64 (backend ready placeholder)
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await updateAdminProfile(profile);

      // 🔥 Update Auth context user (IMPORTANT)
      setUser((prev) => ({
        ...prev,
        ...res.data,
      }));
      setProfile({
        name: "",
        contact: "",
        email: "",
        avatar: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Profile Information
      </h2>

      {/* Avatar Upload */}
      <AvatarUpload image={profile.avatar} onChange={handleAvatarChange} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Contact Number</label>
          <input
            name="contact"
            value={profile.contact}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Email Address</label>
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
