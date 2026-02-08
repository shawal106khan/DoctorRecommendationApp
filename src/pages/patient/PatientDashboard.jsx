import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorCard from "./components/DoctorCard";
import DashboardHome from "./DashboardHome";
import { getDoctors } from "../../store/doctorStore";
import { useNavigate } from "react-router-dom";
import recommendDoctorImg from "../../assets/Recommend_doctor.png";
import { Star } from "lucide-react";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { useSearchParams } from "react-router-dom";
const DISEASE_TO_SPECIALIZATION = {
  "Heart Disease": "Cardiologist",
  "Bone Pain": "Orthopedic Surgeon",
  "Joint Pain": "Orthopedic Surgeon",
  "Skin Allergy": "Dermatologist",
};

const PatientDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [selectedDisease, setSelectedDisease] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const doctors = useMemo(() => getDoctors(), [searchKey]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const section = searchParams.get("section");

    if (section === "search") {
      setTimeout(() => {
        triggerSearchSection();

        navigate("/patient/dashboard", { replace: true });
      });
    }
  }, [searchParams, triggerSearchSection, navigate]);

  const filteredDoctors = useMemo(() => {
    if (!selectedDisease) return doctors;

    const specialization = DISEASE_TO_SPECIALIZATION[selectedDisease];
    if (!specialization) return [];

    return doctors.filter((doctor) => {
      if (!doctor.specialization) return false;

      return (
        doctor.specialization.toLowerCase().trim() ===
        specialization.toLowerCase().trim()
      );
    });
  }, [doctors, selectedDisease]); // ✅ doctors MUST be dependency

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
              <DoctorCard key={doctor.id || doctor.email} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
