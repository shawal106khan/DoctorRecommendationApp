const DoctorHero = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex gap-6">
      <img
        src={doctor.avatar}
        alt={doctor.name}
        className="w-28 h-28 rounded-full object-cover border"
      />

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">{doctor.name}</h1>

        <p className="text-green-600 font-medium mt-1">PMDC Verified</p>

        <p className="text-gray-700 mt-2">{doctor.specialization}</p>
        <p className="text-gray-500 text-sm">{doctor.qualification}</p>

        <p className="text-blue-500 mt-2">
          {doctor.experienceYears} Years Experience
        </p>
      </div>
    </div>
  );
};

export default DoctorHero;
