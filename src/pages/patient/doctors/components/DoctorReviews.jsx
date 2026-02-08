import { getDoctorReviews } from "../../../../utils/doctorRatings";
import { Star } from "lucide-react";
import { useState } from "react";
const DoctorReviews = ({ doctor }) => {
  const reviews = getDoctorReviews(doctor.id);
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900">Patient Reviews</h2>
        <p className="text-sm text-gray-500 mt-4">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900">Patient Reviews</h2>

      {/* Reviews list */}

      {visibleReviews.map((a, index) => (
        <div
          key={a.id}
          className={`pt-4 ${index !== 0 ? "border-t border-gray-100" : ""}`}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                {a.patientName?.charAt(0) || "P"}
              </div>

              {/* Name + date */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {a.patientName || "Anonymous"}
                </p>
                <p className="text-xs text-gray-400">{a.date || "Recently"}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < a.review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <p className="text-sm text-gray-700 mt-3 leading-relaxed">
            {a.review.comment}
          </p>
        </div>
      ))}
      {/* Show more / less */}
      {reviews.length > 3 && (
        <div className="pt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showAll ? "Show Less" : `Show All (${reviews.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
