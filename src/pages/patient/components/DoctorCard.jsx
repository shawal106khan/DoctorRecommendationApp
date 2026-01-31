import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Top */}
      <div className="flex items-center gap-4">
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
          <p className="text-sm text-gray-400"> {doctor.hospitalName}</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-medium"> {doctor.rating ?? "4.5"}</span>
        </div>

        <button
          onClick={() => navigate(`/doctors/${doctor.id}`)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
