export const ICONS = {
  "Total Appointments": "📅",
  "Pending Requests": "⏳",
  Accepted: "✔️",
  Completed: "✅",
};
export const STATUS_COLORS = {
  pending: "#f59e0b", // yellow
  accepted: "#16a34a", // green
  completed: "#22c55e", // green bright
  rejected: "#dc2626", // red
  default: "#6b7280", // gray
};
export const statusColor = (status) => {
  switch (status) {
    case "accepted":
      return "text-green-600";
    case "completed":
      return "text-green-700";
    case "rejected":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    default:
      return "text-gray-500";
  }
};
