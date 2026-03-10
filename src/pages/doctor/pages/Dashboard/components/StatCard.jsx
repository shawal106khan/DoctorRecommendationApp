import { STAT_CONFIG } from "../../../../../utils/statusColors";

const StatCard = ({ label, value }) => {
  const config = STAT_CONFIG[label];
  const Icon = config?.icon;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-6 flex items-center justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-400 font-medium tracking-wide">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
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
