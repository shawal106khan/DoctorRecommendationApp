import { getDoctorReviews } from "../../../../utils/doctorRatings";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";

const DoctorReviews = ({ doctor }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getDoctorReviews(doctor.id);
        setReviews(data);
      } catch (error) {
        console.error("Error loading reviews:", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    if (doctor?.id) fetchReviews();
  }, [doctor?.id]);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
          <h2 className="text-base font-bold text-[#0D2E4E]">
            Patient Reviews
          </h2>
        </div>
        {reviews.length > 0 && (
          <span className="bg-[#E8F4FD] text-[#1A6FA8] text-[10px] font-bold px-2.5 py-1 rounded-full">
            {reviews.length} Reviews
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-3">
            <Star size={20} className="text-[#1A6FA8]" />
          </div>
          <p className="text-[#0D2E4E] font-semibold text-sm">No reviews yet</p>
          <p className="text-[#6B839A] text-xs mt-1">
            Be the first to leave a review
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {visibleReviews.map((review, index) => (
              <div
                key={review.reviews_id}
                className={`${index !== 0 ? "border-t border-[#EEF5FC] pt-4" : ""}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {review?.patients?.full_name?.[0]?.toUpperCase() || "P"}
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

          {reviews.length > 3 && (
            <div className="mt-5 pt-4 border-t border-[#EEF5FC] text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-semibold text-[#1A6FA8] hover:text-[#155e8f] transition"
              >
                {showAll ? "Show Less" : `Show All (${reviews.length})`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorReviews;
