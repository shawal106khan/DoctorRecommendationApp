import { STAT_CONFIG } from "../../../utils/statusColors";

const StatCard = ({ label, value }) => {
  const config = STAT_CONFIG[label];
  const Icon = config?.icon;

  return (
    <div className="bg-white rounded-xl shadow-md shadow-gray-200 border border-gray-100 px-5 py-6 flex items-center justify-between hover:shadow-md transition">
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>

      {/* RIGHT ICON */}
      {Icon && (
        <div className={`p-3 rounded-xl ${config.bgColor} transition`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
