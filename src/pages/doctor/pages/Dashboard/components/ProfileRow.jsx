const ProfileRow = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
};

export default ProfileRow;
