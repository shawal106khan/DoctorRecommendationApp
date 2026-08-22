import { STAT_CONFIG } from "../../../../../utils/statusColors";

const StatCard = ({ label, value }) => {
  const config = STAT_CONFIG[label];
  const Icon = config?.icon;

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] px-3 py-3 sm:px-5 sm:py-5 flex items-center justify-between hover:shadow-[0_8px_28px_rgba(26,111,168,0.14)] hover:-translate-y-0.5 transition-all duration-300">
      <div className="min-w-0">
        <p className="text-[9px] sm:text-[11px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1 truncate">
          {label}
        </p>
        <p className="text-xl sm:text-3xl font-bold text-[#0D2E4E]">{value}</p>
      </div>
      {Icon && (
        <div
          className={`w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${config.bgColor}`}
        >
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor}`} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
