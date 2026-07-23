import { Pencil, ShieldCheck } from "lucide-react";

const ProfileHeader = ({ user, onEdit, hideEdit = false }) => {
  const avatar = user?.avatar;

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden mb-5 ">
      {/* Gradient banner */}
      <div className="h-20 bg-gradient-to-r from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-0 left-1/3 w-20 h-20 rounded-full bg-[#38B2A0] opacity-10 blur-xl" />
      </div>

      <div className="px-6 pb-5">
        <div className="flex items-end justify-between -mt-10">
          {/* Avatar + info */}
          <div className="flex items-end gap-4 ">
            <div className="relative flex-shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Doctor"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-[0_4px_16px_rgba(26,111,168,0.20)]"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white flex items-center justify-center text-2xl font-bold border-4 border-white shadow-[0_4px_16px_rgba(26,111,168,0.20)]">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
            </div>

            <div className="mb-1 mt-12">
              <h2 className="text-lg font-bold text-[#0D2E4E] leading-tight">
                Dr. {user?.name || "Doctor Name"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {user?.specialization && (
                  <span className="bg-[#E8F4FD] text-[#1A6FA8] text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    {user.specialization}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold">
                  <ShieldCheck size={11} /> PMDC Verified
                </span>
              </div>
            </div>
          </div>

          {/* Edit button */}
          {!hideEdit && onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center gap-1.5 px-4 py-4 mt-2 rounded-xl text-[#E8F4FD] bg-[#1A6FA8] text-xs font-bold hover:text-[#E8F4FD]  hover:bg-[#0e75ba] transition-all duration-200 mb-1 hover:shadow-lg hover:shadow-[#1A6FA8]/30"
            >
              <Pencil size={12} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
