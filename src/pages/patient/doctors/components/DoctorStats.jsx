import { Star } from "lucide-react";

const DoctorStats = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        {doctor.reviewsCount ?? 7} Reviews
      </h2>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="currentColor" />
          ))}
        </div>
        <span className="text-sm text-gray-600">4.5/5 Average rating</span>
      </div>
    </div>
  );
};

export default DoctorStats;
