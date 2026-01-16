import { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorCard from "../../components/cards/DoctorCard";
import DashboardHome from "./DashboardHome";
import { doctors } from "../../data/mockDoctors";
import recommendDoctorImg from "../../assets/Recommend_doctor.png";
import { Star } from "lucide-react";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";

const PatientDashboard = () => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const { ref: searchRef, highlight } = useSearchHighlight();

  const filteredDoctors = useMemo(() => {
    if (!selectedDisease) return doctors;
    return doctors.filter((doctor) => doctor.disease === selectedDisease);
  }, [selectedDisease]);

  return (
    <DashboardLayout role="patient">
      {/* Search Section */}
      <div ref={searchRef}>
        <div
          className={`transition-all duration-700 rounded-xl ${
            highlight ? "ring-4 ring-gray-300 animate-pulse" : ""
          }`}
        >
          <DashboardHome onSearch={setSelectedDisease} />
        </div>
      </div>

      {/* Doctors Section */}
      <div className="p-10 bg-blue-50 shadow-lg">
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
    </DashboardLayout>
  );
};

export default PatientDashboard;
