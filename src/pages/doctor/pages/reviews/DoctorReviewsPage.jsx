import DashboardLayout from "../../../../components/layout/DashboardLayout";
import {
  getDoctorAverageRating,
  getDoctorReviews,
  getDoctorRatingCounts,
} from "../../../../utils/doctorRatings";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getDoctorByUserId,
  getUserData,
} from "../../../../services/userService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";

const DoctorReviewsPage = () => {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [distribution, setDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const getDoctorId = async () => {
      const { userId } = await getUserData();
      const dbDoctor = await getDoctorByUserId(userId);
      if (dbDoctor) setDoctorId(dbDoctor.id || dbDoctor.doctors_id);
    };
    getDoctorId();
  }, []);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        setLoading(true);
        const [avgData, distData, reviewsData] = await Promise.all([
          getDoctorAverageRating(doctorId),
          getDoctorRatingCounts(doctorId),
          getDoctorReviews(doctorId),
        ]);
        setAverage(avgData.average);
        setCount(avgData.count);
        setDistribution(distData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) fetchAllReviews();
  }, [doctorId]);

  return (
    <DashboardLayout role="doctor">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            See what your patients are saying
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Doctor Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                My Patient Reviews
              </h1>
            </div>
          </div>

          {/* Analytics card */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
            <div className="p-6 grid md:grid-cols-3 gap-6">
              {/* Average score */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(26,111,168,0.30)] mb-3">
                  <span className="text-2xl font-bold text-white leading-none">
                    {average}
                  </span>
                  <span className="text-white/60 text-[10px] mt-0.5">
                    out of 5
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="text-yellow-400"
                      fill={i < Math.round(average) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#6B839A]">{count} reviews</p>
              </div>

              {/* Distribution */}
              <div className="md:col-span-2 space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5 w-10 flex-shrink-0">
                      <span className="text-xs font-semibold text-[#4A6680]">
                        {star}
                      </span>
                      <Star
                        size={10}
                        className="text-yellow-400"
                        fill="currentColor"
                      />
                    </div>
                    <div className="flex-1 bg-[#F0F4F8] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] transition-all duration-500"
                        style={{ width: `${distribution[star]}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#6B839A] w-10 text-right">
                      {distribution[star]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
              <h2 className="text-base font-bold text-[#0D2E4E]">
                Patient Comments
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner />
              </div>
            ) : reviews.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-3">
                  <Star size={20} className="text-[#1A6FA8]" />
                </div>
                <p className="text-[#0D2E4E] font-bold text-sm">
                  No reviews yet
                </p>
                <p className="text-[#6B839A] text-xs mt-1">
                  Patient reviews will appear here after completed appointments.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div
                    key={review.reviews_id}
                    className={`${index !== 0 ? "border-t border-[#EEF5FC] pt-4" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                          {review?.patients?.full_name?.[0]?.toUpperCase() ||
                            "P"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0D2E4E]">
                            {review?.patients?.full_name || "Patient"}
                          </p>
                          <p className="text-[10px] text-[#8AAEC8]">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            className="text-yellow-400"
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#6B839A] leading-relaxed pl-12">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorReviewsPage;
