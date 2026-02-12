import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  ClipboardCheck,
  XCircle,
} from "lucide-react";

export const STAT_CONFIG = {
  "Total Appointments": {
    icon: CalendarCheck,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  "Total Doctors": {
    icon: CalendarCheck,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  "Pending Requests": {
    icon: Clock,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  Accepted: {
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  Rejected: {
    icon: XCircle,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  Completed: {
    icon: ClipboardCheck,
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
  },
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
