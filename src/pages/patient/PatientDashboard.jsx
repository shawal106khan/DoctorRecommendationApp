import { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorCard from "../../components/entities/doctor/cards/DoctorCard";
import DashboardHome from "./DashboardHome";
import { doctors } from "../../data/mockDoctors";
import recommendDoctorImg from "../../assets/Recommend_doctor.png";
import { Star } from "lucide-react";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";

const PatientDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDisease, setSelectedDisease] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const {
    ref: searchRef,
    highlight,
    trigger: triggerSearchSection,
  } = useSearchHighlight();

  const {
    ref: recommendationRef,
    highlight: recommendationHighlight,
    trigger: triggerRecommendation,
  } = useSearchHighlight();

  const filteredDoctors = useMemo(() => {
    if (!selectedDisease) return doctors;
    return doctors.filter((doctor) => doctor.disease === selectedDisease);
  }, [selectedDisease]);

  const handleSearch = (disease) => {
    setIsLoading(true); // 🔹 start loading
    setSelectedDisease(disease);

    // ⏳ simulate backend delay (later replace with API)
    setTimeout(() => {
      setIsLoading(false); // 🔹 stop loading
      setSearchKey((prev) => prev + 1);

      // 🔹 scroll + highlight recommended doctors
      triggerRecommendation();
    }, 800);
  };

  return (
    <DashboardLayout role="patient" onSearchDoctorClick={triggerSearchSection}>
      <div ref={searchRef}>
        <div
          className={`transition-all duration-700 rounded-xl ${
            highlight ? "ring-4 ring-gray-300 animate-pulse" : ""
          }`}
        >
          <DashboardHome
            key={searchKey}
            onSearch={handleSearch}
            loading={isLoading}
          />
        </div>
      </div>

      {/* Doctors Section */}
      {/* Doctors Section */}
      <div
        ref={recommendationRef}
        className={`p-10 bg-blue-50 shadow-lg transition-all duration-700
    ${recommendationHighlight ? "ring-4 ring-gray-400 animate-pulse" : ""}
  `}
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
    </DashboardLayout>
  );
};

export default PatientDashboard;
