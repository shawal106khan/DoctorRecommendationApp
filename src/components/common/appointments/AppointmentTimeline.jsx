const LABELS = {
  requested: "Requested",
  accepted: "Accepted",
  rejected: "Rejected",
  completed: "Completed",
  pending: "Pending",
  approved: "Approved",
};

const COLOR_MAP = {
  requested: "bg-yellow-400",
  pending: "bg-yellow-400",
  accepted: "bg-[#38B2A0]",
  approved: "bg-[#38B2A0]",
  rejected: "bg-red-400",
  completed: "bg-[#1A6FA8]",
};

const AppointmentTimeline = ({ timeline = [] }) => {
  return (
    <div className="mt-3 border-l-2 border-[#D6E6F2] pl-4 space-y-3">
      {timeline.map((t, index) => (
        <div key={index} className="relative">
          <div
            className={`absolute -left-[17px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${COLOR_MAP[t.state] || "bg-[#8AAEC8]"}`}
          />
          <p className="text-xs font-bold text-[#0D2E4E] uppercase tracking-wide">
            {LABELS[t.state] || t.state}
          </p>
          <p className="text-[10px] text-[#8AAEC8] mt-0.5">
            {new Date(t.at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentTimeline;
