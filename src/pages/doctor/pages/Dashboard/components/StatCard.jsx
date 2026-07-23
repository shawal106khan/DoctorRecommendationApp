import { STAT_CONFIG } from "../../../../../utils/statusColors";

const StatCard = ({ label, value }) => {
  const config = STAT_CONFIG[label];
  const Icon = config?.icon;

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] px-5 py-5 flex items-center justify-between hover:shadow-[0_8px_28px_rgba(26,111,168,0.14)] hover:-translate-y-0.5 transition-all duration-300">
      <div>
        <p className="text-[11px] font-semibold text-[#4A6680] uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className="text-3xl font-bold text-[#0D2E4E]">{value}</p>
      </div>
      {Icon && (
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center ${config.bgColor}`}
        >
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
