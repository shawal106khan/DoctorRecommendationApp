const DoctorLocation = ({ doctor }) => {
  const profile = doctor.profile || {};

  const openInMaps = () => {
    // ✅ Prefer saved Google Maps link
    if (profile.mapLink) {
      window.open(profile.mapLink, "_blank");
      return;
    }

    // ✅ Fallback to address search
    const address = `${profile.clinicName || ""} ${profile.address || ""} ${profile.city || ""}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-3 text-blue-700">Location</h2>

      <div className="bg-blue-50 p-6 rounded-lg">
        <p className="font-medium">{profile.clinicName}</p>
        <p className="text-sm text-gray-600">
          {profile.address}, {profile.city}
        </p>

        <button
          onClick={openInMaps}
          className="mt-4 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
        >
          Get Address
        </button>
      </div>
    </div>
  );
};

export default DoctorLocation;
