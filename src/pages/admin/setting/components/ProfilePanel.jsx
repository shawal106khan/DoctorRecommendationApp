import { useEffect, useState } from "react";
import AvatarUpload from "../../../../components/common/components/AvatarUpload";
import {
  getAdminProfile,
  updateAdminProfile,
  uploadAdminAvatar,
} from "../../../../services/adminSettingsService";
import { useAuth } from "../../../../context/useAuth";
import { getCurrentUser } from "../../../../services/authService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import { Save } from "lucide-react";

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

  const handleAvatarChange = async (file) => {
    if (!file) return;
    try {
      const userId = await getCurrentUser();
      const avatarUrl = await uploadAdminAvatar(userId, file);
      setProfile((prev) => ({ ...prev, profile_picture: avatarUrl }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedProfile = await updateAdminProfile(profile);
      setUser((prev) => ({ ...prev, ...updatedProfile }));
      setProfile(updatedProfile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!profile)
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner />
      </div>
    );

  const inputClass =
    "mt-1.5 w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px] mb-1">
          Profile
        </p>
        <h2 className="text-lg font-bold text-[#0D2E4E]">
          Profile Information
        </h2>
      </div>

      <AvatarUpload
        image={profile.profile_picture}
        onChange={handleAvatarChange}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide">
            Full Name
          </label>
          <input
            name="full_name"
            value={profile.full_name || ""}
            onChange={handleChange}
            className={inputClass}
            placeholder="Admin Name"
          />
        </div>
        <div>
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide">
            Contact Number
          </label>
          <input
            name="phone_number"
            value={profile.phone_number || ""}
            onChange={handleChange}
            className={inputClass}
            placeholder="+92 300 0000000"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide">
            Email Address
          </label>
          <input
            name="email"
            value={profile.email || ""}
            onChange={handleChange}
            className={inputClass}
            placeholder="admin@medconnect.pk"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          <Save size={14} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePanel;
