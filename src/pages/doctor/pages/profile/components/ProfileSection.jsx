const ProfileSection = ({ title, children }) => {
  return (
    <div className="bg-blue-50 rounded-lg shadow shadow-slate-300 p-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-4 ">{title}</h3>
      {children}
    </div>
  );
};

export default ProfileSection;
