import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorCard from "./components/DoctorCard";
import DashboardHome from "./DashboardHome";
import recommendDoctorImg from "../../assets/Recommend_doctor.png";
import { Star } from "lucide-react";
import { useSearchHighlight } from "../../hooks/useSearchHighlight";
import { getSpecializationIdByDisease } from "../../services/diseaseService";
import {
  // fetchRecommendedDoctors,
  fetchTopRatedDoctors,
  fetchRecommendedDoctorsAI,
} from "../../services/doctorService";
import { useLoading } from "../../hooks/useLoading";
import { useSearchSection } from "../../hooks/useSearchSection";
import { calculateRecommendation } from "../../utils/recommendationEngine";
import HealthAssistant from "../../components/assistant/HealthAssistant";
import { getAssistantQuestions } from "../../services/healthAssistantService";
const PatientDashboard = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  // const [selectedDisease, setSelectedDisease] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchKey, setSearchKey] = useState(0);
  const [dbDoctors, setDbDoctors] = useState([]);
  const [topDoctors, setTopDoctors] = useState([]);
  const [assistantQuestions, setAssistantQuestions] = useState([]);
  const [selectedSpecializationName, setSelectedSpecializationName] =
    useState("");
  const [assistantSuggestions, setAssistantSuggestions] = useState([]);
  const showRecommendationGroups =
    searchType === "disease" ||
    searchType === "specialization" ||
    (!searchType && topDoctors.length > 0);
  useEffect(() => {
    const loadTopDoctors = async () => {
      try {
        const data = await fetchTopRatedDoctors();

        const rankedDoctors = calculateRecommendation(data)
          .sort((a, b) => b.recommendationScore - a.recommendationScore)
          .slice(0, 6);

        setTopDoctors(rankedDoctors);

        console.log("TOP DOCTORS", rankedDoctors);
      } catch (err) {
        console.error(err);
      }
    };
    loadTopDoctors();
  }, []);

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
  useSearchSection(triggerSearchSection);

  const filteredDoctors = useMemo(() => {
    if (searchType) return dbDoctors;
    return topDoctors;
  }, [searchType, dbDoctors, topDoctors]);

  const bestMatches = filteredDoctors.filter(
    (d) => d.recommendationCategory === "Best Match",
  );

  const highlyRecommended = filteredDoctors.filter(
    (d) => d.recommendationCategory === "Highly Recommended",
  );

  const recommended = filteredDoctors.filter(
    (d) => d.recommendationCategory === "Recommended",
  );

  const handleSearch = async (diseaseId) => {
    if (!diseaseId) return;
    startLoading();
    // setSelectedDisease(diseaseId);
    setSearchType("disease");
    try {
      const specializationId = await getSpecializationIdByDisease(diseaseId);
      if (!specializationId) {
        setDbDoctors([]);
        return;
      }
      const doctors = await fetchRecommendedDoctorsAI(specializationId);
      console.log("RAW Doctors", doctors);
      const questions = await getAssistantQuestions(specializationId);
      console.log("Questions Raw:", questions);
      setAssistantQuestions(questions);
      const randomSuggestions = [...questions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setAssistantSuggestions(randomSuggestions);
      const aiDoctors = calculateRecommendation(doctors);
      console.log(aiDoctors);
      setDbDoctors(aiDoctors);
      if (aiDoctors.length > 0) {
        setSelectedSpecializationName(aiDoctors[0].specialization_name);
      }
    } catch (err) {
      console.error(err);
      setDbDoctors([]);
    } finally {
      stopLoading();
      setSearchKey((prev) => prev + 1);
      triggerRecommendation();
    }
  };

  const handleSpecializationSearch = async (specializationId) => {
    startLoading();

    try {
      const doctors = await fetchRecommendedDoctorsAI(specializationId);
      const questions = await getAssistantQuestions(specializationId);
      console.log("Questions Raw:", questions);
      setAssistantQuestions(questions);
      const randomSuggestions = [...questions]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      setAssistantSuggestions(randomSuggestions);
      if (doctors.length > 0) {
        setSelectedSpecializationName(doctors[0].specialization_name);
      }
      const aiDoctors = calculateRecommendation(doctors);

      setDbDoctors(aiDoctors);
      setSearchType("specialization");
      // setSelectedDisease("");
    } catch (err) {
      console.error(err);
      setDbDoctors([]);
    } finally {
      stopLoading();
      triggerRecommendation();
    }
  };

  return (
    <DashboardLayout role="patient" onSearchDoctorClick={triggerSearchSection}>
      <div ref={searchRef}>
        <div
          className={`transition-all duration-700 rounded-xl ${highlight ? "ring-4 ring-[#D6E6F2] animate-pulse" : ""}`}
        >
          <DashboardHome
            key={searchKey}
            onSearch={handleSearch}
            onSpecializationSearch={handleSpecializationSearch}
            loading={loading}
          />
        </div>
      </div>

      {/* Doctors Section */}
      <div
        ref={recommendationRef}
        className={`px-4 sm:px-6 lg:px-12 py-6 sm:py-10 bg-[#F0F4F8] transition-all duration-700
    ${recommendationHighlight ? "ring-4 ring-[#D6E6F2] animate-pulse rounded-xl" : ""}`}
      >
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-7">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Icon */}
            <div className="hidden sm:flex w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac]  items-center justify-center shadow-[0_4px_16px_rgba(26,111,168,0.30)] flex-shrink-0">
              {searchType ? (
                <img
                  src={recommendDoctorImg}
                  alt="Recommended"
                  className="w-6 h-6"
                />
              ) : (
                <Star size={20} className="text-white" fill="white" />
              )}
            </div>

            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-5 bg-[#1A6FA8]" />
                <p className="text-[10px] font-bold text-[#1A6FA8] uppercase tracking-[2px]">
                  {searchType ? "Search Results" : "Top Picks"}
                </p>
                <div className="h-px w-5 bg-[#1A6FA8]" />
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0D2E4E] leading-tight my-3 sm:my-1">
                {searchType === "disease" ? (
                  <>
                    Doctors for
                    <span className="text-[#1A6FA8]"> Selected Disease</span>
                  </>
                ) : searchType === "specialization" ? (
                  <>
                    Doctors for
                    <span className="text-[#1A6FA8]">
                      {" "}
                      Selected Specialization
                    </span>
                  </>
                ) : (
                  <>
                    Top Rated{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-[#1A6FA8]">
                        Recommended
                      </span>
                      <span className="absolute bottom-0 left-0 w-full h-[6px] bg-[#E8F4FD] rounded-full -z-0" />
                    </span>{" "}
                    Doctors
                  </>
                )}
              </h2>
            </div>
          </div>

          {/* Count badge */}
          {filteredDoctors.length > 0 && (
            <div className="flex flex-row sm:flex-col items-center absolute sm:right-4 right-2 gap-1.5 sm:gap-0 bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-2xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] flex-shrink-0 self-start sm:self-auto">
              <span className="text-sm sm:text-lg font-bold leading-none">
                {filteredDoctors.length}
              </span>
              <span className="text-[9px] sm:text-[9px] font-medium opacity-90 sm:opacity-75 sm:mt-0.5">
                Doctors
              </span>
            </div>
          )}
        </div>
        {/* Empty state */}
        {filteredDoctors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-16 px-4 text-center bg-white rounded-2xl border border-[#D6E6F2]">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
              <Star size={22} className="text-[#1A6FA8]" />
            </div>
            <p className="text-[#0D2E4E] font-bold mb-1">
              No specialist is currently available for this disease.
            </p>
            <p className="text-[#6B839A] text-sm">
              Please try again later or select another condition
            </p>
          </div>
        ) : showRecommendationGroups ? (
          <div className="space-y-6 sm:space-y-10">
            {bestMatches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-green-500 rounded-full" />
                  <h3 className="text-base font-bold text-[#0D2E4E]">
                    🏆 Best Match
                  </h3>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                    {bestMatches.length} Doctors
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {bestMatches.map((doc) => (
                    <DoctorCard
                      key={doc.doctors_id}
                      doctor={{
                        id: doc.doctors_id,
                        name: doc.name,
                        avatar: doc.profile_pic_url,
                        specialization: doc.specialization_name,
                        experienceYears: doc.experience_years,
                        bio: doc.doctor_bio,
                        consultationFee: doc.consultation_fee,
                        recommendationScore: doc.recommendationScore,
                        recommendationCategory: doc.recommendationCategory,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {highlyRecommended.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-[#1A6FA8] rounded-full" />
                  <h3 className="text-base font-bold text-[#0D2E4E]">
                    ⭐ Highly Recommended
                  </h3>
                  <span className="text-[10px] font-bold text-[#1A6FA8] bg-[#E8F4FD] border border-[#D6E6F2] px-2 py-0.5 rounded-full">
                    {highlyRecommended.length} Doctors
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {highlyRecommended.map((doc) => (
                    <DoctorCard
                      key={doc.doctors_id}
                      doctor={{
                        id: doc.doctors_id,
                        name: doc.name,
                        avatar: doc.profile_pic_url,
                        specialization: doc.specialization_name,
                        experienceYears: doc.experience_years,
                        bio: doc.doctor_bio,
                        consultationFee: doc.consultation_fee,
                        recommendationScore: doc.recommendationScore,
                        recommendationCategory: doc.recommendationCategory,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {recommended.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-[#38B2A0] rounded-full" />
                  <h3 className="text-base font-bold text-[#0D2E4E]">
                    ✅ Recommended
                  </h3>
                  <span className="text-[10px] font-bold text-[#38B2A0] bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full">
                    {recommended.length} Doctors
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {recommended.map((doc) => (
                    <DoctorCard
                      key={doc.doctors_id}
                      doctor={{
                        id: doc.doctors_id,
                        name: doc.name,
                        avatar: doc.profile_pic_url,
                        specialization: doc.specialization_name,
                        experienceYears: doc.experience_years,
                        bio: doc.doctor_bio,
                        consultationFee: doc.consultation_fee,
                        recommendationScore: doc.recommendationScore,
                        recommendationCategory: doc.recommendationCategory,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {searchType && assistantQuestions.length > 0 && (
              <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                <HealthAssistant
                  specializationName={selectedSpecializationName}
                  questions={assistantQuestions}
                  suggestions={assistantSuggestions}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topDoctors.map((doc) => (
              <DoctorCard
                key={doc.doctors_id}
                doctor={{
                  id: doc.doctors_id,
                  name: doc.name,
                  avatar: doc.profile_pic_url,
                  specialization: doc.specialization_name,
                  experienceYears: doc.experience_years,
                  bio: doc.doctor_bio,
                  consultationFee: doc.consultation_fee,
                  recommendationScore: doc.recommendationScore,
                  recommendationCategory: doc.recommendationCategory,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
