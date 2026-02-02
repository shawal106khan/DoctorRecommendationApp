const LABELS = {
  requested: "Requested",
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Completed",
};
const COLOR_MAP = {
  requested: "bg-yellow-500",
  accepted: "bg-green-600",
  rejected: "bg-red-600",
  completed: "bg-green-700",
};

const AppointmentTimeline = ({ timeline = [] }) => {
  return (
    <div className="mt-3 border-l-2 border-gray-300 pl-4 space-y-2">
      {timeline.map((t, index) => (
        <div key={index} className="relative">
          <div
            className={`absolute -left-[11px] top-1.5 w-2 h-2 rounded-full ${
              COLOR_MAP[t.state] || "bg-gray-400"
            }`}
          />
          <p className="text-sm font-medium">{LABELS[t.state]}</p>
          <p className="text-xs text-gray-500">
            {new Date(t.at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentTimeline;
