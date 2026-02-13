import { useAuth } from "../../../../context/useAuth";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { getDoctors } from "../../../../store/doctorStore";
import {
  getDoctorAverageRating,
  getDoctorReviews,
  getDoctorRatingCounts,
} from "../../../../utils/doctorRatings";
import { Star } from "lucide-react";

const DoctorReviewsPage = () => {
  const { user } = useAuth();

  const doctor = getDoctors().find((d) => d.email === user?.email);
  const doctorId = doctor?.id;

  const { average, count } = getDoctorAverageRating(doctorId);
  const distribution = getDoctorRatingCounts(doctorId);
  const reviews = getDoctorReviews(doctorId);

  return (
    <DashboardLayout role="doctor">
      <div className="p-6 space-y-6 font-serif">
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-400 rounded-sm
         p-5 text-white shadow shadow-blue-600 mb-6"
        >
          <h1 className="text-2xl font-semibol">My Patient Reviews</h1>
        </div>

        {/* ⭐ Top Analytics Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 grid md:grid-cols-3 gap-6">
          {/* Average */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-gray-900">{average}</p>
            <p className="text-yellow-500 flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < Math.round(average) ? "currentColor" : "none"}
                />
              ))}
            </p>
            <p className="text-sm text-gray-500 mt-1">{count} reviews</p>
          </div>

          {/* Distribution Bars */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm w-6">{star}★</span>

                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: `${distribution[star]}%` }}
                  />
                </div>

                <span className="text-xs text-gray-500 w-10">
                  {distribution[star]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 🗣 Reviews List */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Patient Comments
          </h2>

          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((a, index) => (
              <div
                key={a.id}
                className={`pt-4 ${
                  index !== 0 ? "border-t border-gray-100" : ""
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {a.patientName || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {a.date || "Recently"}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex text-yellow-500">
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
                <p className="text-sm text-gray-700 mt-2">{a.review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorReviewsPage;
