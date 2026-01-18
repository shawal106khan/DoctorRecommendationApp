import { useParams } from "react-router-dom";
import { doctors } from "../../../data/mockDoctors";
import { Star, MapPin, BriefcaseMedical } from "lucide-react";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return <p className="text-center mt-10">Doctor not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-24 h-24 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-2xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin size={16} />
              {doctor.hospital}
            </div>

            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-medium">{doctor.rating}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">About Doctor</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {doctor.about}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Experience</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BriefcaseMedical size={16} />
              {doctor.experience} years experience
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Book Appointment
          </button>

          <button className="border px-6 py-2 rounded-lg hover:bg-gray-100">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
