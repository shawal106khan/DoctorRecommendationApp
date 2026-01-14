const DoctorCard = ({ doctor }) => {
  const { name, specialization, hospital, rating, avatar } = doctor;

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-5 
    transition-all duration-300
      hover:shadow-xl hover:-translate-y-1"
    >
      {/* Profile Image */}
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10  rounded-full object-cover mb-3"
      />

      <h4 className="font-semibold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-600">{specialization}</p>
      <p className="text-xs text-gray-500">{hospital}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-medium">⭐ {rating}</span>

        <button className="text-sm text-blue-600 font-medium hover:underline">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
