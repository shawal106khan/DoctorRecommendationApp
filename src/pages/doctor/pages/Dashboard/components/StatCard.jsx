import { ICONS } from "../../../../../utils/statusColors";
const StatCard = ({ label, value }) => {
  return (
    <div className="bg-gradient-to-r from-slate-200 to-blue-100 rounded-xl shadow px-4 py-6 text-center ">
      <div className="flex justify-center">
        <div className={`w-12 h-12 `}>{ICONS[label] || "📊"}</div>
        <div>
          <p
            className={`text-base  text-black ${label === "Pending Requests" ? "text-yellow-500" : label === "Accepted" ? "text-green-500" : label === "Completed" ? "text-green-800" : "text-blue-500"}`}
          >
            {label}
          </p>
        </div>
      </div>
      <p
        className={`text-3xl font-semibold text-black mt-1 ${label === "Pending Requests" ? "text-yellow-500" : label === "Accepted" ? "text-green-500" : label === "Completed" ? "text-green-800" : "text-blue-500"}`}
      >
        {value}
      </p>
    </div>
  );
};

export default StatCard;
