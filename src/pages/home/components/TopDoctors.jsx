import { useState, useEffect } from "react";
import { fetchTopRatedDoctors } from "../../../services/doctorService";
import DoctorCard from "../../patient/components/DoctorCard";
import { calculateRecommendation } from "../../../utils/recommendationEngine";

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTopRatedDoctors();
        const rankedDoctors = calculateRecommendation(data);
        setDoctors(rankedDoctors);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section id="top-doctors" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Featured Doctors
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2E4E] tracking-tight">
            Top Rated Doctors
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] rounded-full mt-3 mx-auto" />
          <p className="text-[#6B839A] mt-4 text-sm">
            Verified professionals trusted by patients across Swat
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[#1A6FA8] border-t-transparent animate-spin" />
            <span className="text-[#6B839A] text-sm">Loading doctors...</span>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A6FA8"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
            </div>
            <p className="text-[#6B839A] text-sm">No top rated doctors yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
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
    </section>
  );
};

export default TopDoctors;
