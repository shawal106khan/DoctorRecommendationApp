import { Camera } from "lucide-react";

const AvatarUpload = ({ image, onChange }) => {
  const getImageSrc = () => {
    if (!image) return null;
    if (image instanceof File) return URL.createObjectURL(image);
    if (typeof image === "string") return image;
    return null;
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative w-28 h-28">
        {getImageSrc() ? (
          <img
            src={getImageSrc()}
            alt="Profile"
            className="w-full h-full rounded-2xl object-cover border-4 border-white shadow-[0_4px_16px_rgba(26,111,168,0.20)]"
          />
        ) : (
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white flex items-center justify-center text-3xl font-bold shadow-[0_4px_16px_rgba(26,111,168,0.25)]">
            U
          </div>
        )}

        <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1A6FA8] hover:bg-[#155e8f] rounded-xl flex items-center justify-center cursor-pointer shadow-md border-2 border-white transition">
          <Camera size={14} className="text-white" />
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
