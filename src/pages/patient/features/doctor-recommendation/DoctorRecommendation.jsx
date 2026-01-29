import DoctorCard from "../../../../components/entities/doctor/cards/DoctorCard";
import recommendDoctorImg from "../../../assets/Recommend_doctor.png";
import { Star } from "lucide-react";

export const DoctorRecommendation = ({
  doctors,
  selectedDisease,
  scrollRef,
  highlight,
}) => {
  const filteredDoctors = selectedDisease
    ? doctors.filter((doc) => doc.disease === selectedDisease)
    : doctors;

  return (
    <div
      ref={scrollRef}
      className={`p-10 bg-blue-50 shadow-lg transition-all duration-700 ${
        highlight ? "ring-4 ring-gray-400 animate-pulse" : ""
      }`}
    >
      <h2 className="mb-6 flex items-center gap-3 lg:text-2xl font-semibold text-gray-900">
        {selectedDisease ? (
          <>
            <img
              src={recommendDoctorImg}
              alt="Recommended Doctors"
              className="w-10 h-10 rounded-lg"
            />
            <span>Doctors for Selected Disease</span>
          </>
        ) : (
          <>
            <Star className="text-yellow-500" size={22} fill="currentColor" />
            <span className="tracking-wide">
              Top Rated <span className="text-blue-400">Recommended</span>{" "}
              Doctors
            </span>
          </>
        )}
      </h2>

      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No doctors found for selected disease.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};
