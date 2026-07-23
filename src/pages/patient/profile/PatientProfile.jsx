import { useState } from "react";
import { Camera, LogOut, ArrowLeft, Save, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import {
  updatePatientProfile,
  uploadPatientAvatar,
} from "../../../services/userService";
import ButtonLoader from "../../../components/common/components/ButtonLoader";
const PatientProfile = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.full_name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.profile_picture || null,
  );
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let avatarUrl = user?.profile_picture || null;
      if (avatarFile) {
        avatarUrl = await uploadPatientAvatar(user.user_id, avatarFile);
      }
      await updatePatientProfile(user.patients_id, name, avatarUrl);
      const updatedUser = {
        ...user,
        full_name: name,
        name: name,
        profile_picture: avatarUrl,
        avatar: avatarUrl,
      };
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.full_name || "");
    setAvatarPreview(user?.profile_picture || null);
    setAvatarFile(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
        <p className="text-white/75 text-xs font-medium tracking-wide">
          Manage your personal information
        </p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Back button */}
        <button
          onClick={() => navigate(`/${user.role}/dashboard`)}
          className="flex items-center gap-2 text-[#1A6FA8] text-sm font-semibold mb-6 hover:text-[#155e8f] transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
          {/* Card gradient header */}
          <div className="bg-gradient-to-br from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] px-6 pt-8 pb-16 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white opacity-5" />
            <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-[#38B2A0] opacity-10 blur-xl" />
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <div className="w-1 h-5 bg-white/40 rounded-full" />
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[2px]">
                Patient Portal
              </p>
            </div>
            <h2 className="text-white text-xl font-bold relative z-10">
              My Profile
            </h2>
          </div>

          {/* Avatar — overlapping header */}
          <div className="flex flex-col items-center -mt-12 pb-6 px-6">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center overflow-hidden border-4 border-white shadow-[0_8px_24px_rgba(26,111,168,0.25)]">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="User"
                    className="w-24 h-24 object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {user?.full_name?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
              {isEditing && (
                <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A6FA8] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#155e8f] transition shadow-md border-2 border-white">
                  <Camera size={14} className="text-white" />
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
                className="w-full h-12 px-4 rounded-xl text-sm text-center text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 font-semibold mt-2"
              />
            ) : (
              <h3 className="text-lg font-bold text-[#0D2E4E] mt-1">
                {user?.full_name}
              </h3>
            )}

            <span className="inline-flex items-center gap-1.5 bg-[#E8F4FD] text-[#1A6FA8] text-[10px] font-bold px-3 py-1 rounded-full mt-2 uppercase tracking-wide">
              <User size={10} />
              {user?.role}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent mx-6" />

          {/* Actions */}
          <div className="px-6 pb-6 space-y-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full h-12 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(26,111,168,0.30)] hover:shadow-[0_6px_24px_rgba(26,111,168,0.40)] hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 h-12 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(26,111,168,0.30)] hover:shadow-[0_6px_24px_rgba(26,111,168,0.40)] transition-all disabled:opacity-60"
                >
                  <Save size={15} />
                  {saving ? <ButtonLoader text="Saving..." /> : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 h-12 bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] text-[#4A6680] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#EEF5FC] transition-all"
                >
                  <X size={15} />
                  Cancel
                </button>
              </div>
            )}

            <button
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              className="w-full h-12 border-[1.5px] border-red-200 text-red-500 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition-all"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
