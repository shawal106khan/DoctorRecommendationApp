const AppointmentDoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-4">
      <img
        src={doctor.avatar}
        alt={doctor.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      <div>
        <h2 className="text-lg font-semibold">{doctor.name}</h2>
        <p className="text-sm text-gray-600">{doctor.specialization}</p>
        <p className="text-xs text-gray-500 mt-1">
          {doctor.profile?.clinicName}
        </p>
      </div>
    </div>
  );
};

export default AppointmentDoctorCard;
