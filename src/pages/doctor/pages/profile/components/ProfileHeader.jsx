const ProfileHeader = ({ user, onEdit, hideEdit = false }) => {
  const avatar = user?.avatar;

  const getAvatarSrc = () => {
    if (!avatar) return "/src/assets/profile-pictur.png";
    return avatar;
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow shadow-slate-300 p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={getAvatarSrc()}
          alt="Doctor"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Dr. {user?.name || "Doctor Name"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.specialization || "Specialization"}
          </p>
          <p className="text-xs text-gray-400">{user?.hospitalName}</p>
        </div>
      </div>

      {/* ✅ ROLE SAFE */}
      {!hideEdit && onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
