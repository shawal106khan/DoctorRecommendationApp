import { MapPin, Building2, Navigation } from "lucide-react";

const LocationRow = ({ icon, label, value }) => {
  const IconComponent = icon;
  return (
    <div className="flex items-start gap-3 bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-3">
      <div className="w-7 h-7 rounded-lg bg-[#E8F4FD] flex items-center justify-center flex-shrink-0 mt-0.5">
        <IconComponent size={13} className="text-[#1A6FA8]" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-[#0D2E4E] mt-0.5">
          {value || "—"}
        </p>
      </div>
    </div>
  );
};

const DoctorLocation = ({ doctor }) => {
  const profile = doctor.profile || {};

  const openInMaps = () => {
    if (profile.mapLink) {
      window.open(profile.mapLink, "_blank");
      return;
    }
    const address = `${profile.clinicName || ""} ${profile.address || ""} ${profile.city || ""}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
        <h2 className="text-base font-bold text-[#0D2E4E]">Location</h2>
      </div>

      <div className="space-y-3 mb-5">
        <LocationRow
          icon={Building2}
          label="Hospital"
          value={profile.clinicName}
        />
        <LocationRow icon={MapPin} label="City" value={profile.city} />
        <LocationRow
          icon={Navigation}
          label="Address"
          value={profile.address}
        />
      </div>

      <button
        onClick={openInMaps}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-[1.5px] border-[#1A6FA8] text-[#1A6FA8] text-sm font-semibold hover:bg-[#1A6FA8] hover:text-white transition-all duration-200"
      >
        <MapPin size={14} />
        Get Directions
      </button>
    </div>
  );
};

export default DoctorLocation;
