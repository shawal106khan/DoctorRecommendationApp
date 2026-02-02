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
