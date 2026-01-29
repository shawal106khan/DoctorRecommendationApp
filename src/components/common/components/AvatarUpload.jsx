import { Camera } from "lucide-react";

const AvatarUpload = ({ image, onChange }) => {
  const getImageSrc = () => {
    if (!image) return "/src/assets/profile-pictur.png";

    // File upload (before backend)
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    // String URL (preview or backend)
    if (typeof image === "string") {
      return image;
    }

    return "/src/assets/profile-pictur.png";
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-32 h-32">
        <img
          src={getImageSrc()}
          alt="Profile"
          className="w-full h-full rounded-full object-cover border"
        />

        <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer shadow">
          <Camera size={16} className="text-white" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onChange(e.target.files[0])}
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;
