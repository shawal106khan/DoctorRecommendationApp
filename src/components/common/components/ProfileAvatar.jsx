import { Camera } from "lucide-react";

const ProfileAvatar = ({
  image,
  onChange,
  size = 112, // default size
  editable = true,
}) => {
  return (
    <div className="relative">
      <img
        src={image || "/src/assets/profile-pictur.png"}
        alt="Profile"
        style={{ width: size, height: size }}
        className="rounded-full object-cover border"
      />

      {editable && (
        <label className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer shadow">
          <Camera size={16} className="text-white" />
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      )}
    </div>
  );
};

export default ProfileAvatar;
