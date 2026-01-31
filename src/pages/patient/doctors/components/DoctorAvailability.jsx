const DoctorAvailability = ({ doctor }) => {
  const profile = doctor.profile || {};

  // 🔹 helper: 24h -> 12h AM/PM
  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const h = Number(hour);
    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Availability</h2>

      <div className="space-y-2 text-base bg-blue-50 p-4 rounded-lg">
        <h3 className="text-green-700 font-medium mb-2">
          Available Days & Timing
        </h3>

        {profile.availableDays?.map((day) => (
          <div key={day} className="flex gap-12 text-base ">
            <span className="font-medium">{day}</span>
            <span>
              {formatTime(profile.startTime)} – {formatTime(profile.endTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAvailability;
