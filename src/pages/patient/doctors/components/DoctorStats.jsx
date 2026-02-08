import { Star } from "lucide-react";
const DoctorStats = ({ average, count, distribution }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
      {/* Average */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">
          {count} Reviews
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {average}/5 Average rating based on {count} reviews.
        </p>
      </div>

      {/* Distribution */}
      <div className="space-y-2">
        {distribution.map((d) => (
          <div key={d.star} className="flex items-center gap-3">
            <span className="text-sm w-6">{d.star}★</span>

            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-2"
                style={{ width: `${d.percent}%` }}
              />
            </div>

            <span className="text-xs text-gray-500 w-10 text-right">
              {d.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorStats;
