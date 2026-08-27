const ProfileSection = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden mb-5">
      <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
          <h3 className="text-base font-bold text-[#0D2E4E]">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;
