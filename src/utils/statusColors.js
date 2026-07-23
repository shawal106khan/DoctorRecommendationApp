import {
  CalendarCheck,
  Clock,
  Clock3,
  CheckCircle2,
  ClipboardCheck,
  XCircle,
  StethoscopeIcon,
  Users,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";

export const STAT_CONFIG = {
  "Total Appointments": {
    icon: CalendarCheck,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },

  "Total Doctors": {
    icon: StethoscopeIcon,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },

  "Active Doctors": {
    icon: UserCheck,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },

  "Suspended Doctors": {
    icon: UserX,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },

  "Deleted Doctors": {
    icon: Trash2,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },

  "Pending Requests": {
    icon: Clock,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },

  Approved: {
    icon: CheckCircle2,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
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

  "Appointment Completed": {
    icon: ClipboardCheck,
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
  },

  "Completed Appointments": {
    icon: ClipboardCheck,
    iconColor: "text-green-700",
    bgColor: "bg-green-100",
  },

  "Pending Appointments": {
    icon: Clock3,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },

  "Total Patients": {
    icon: Users,
    iconColor: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
};

export const STATUS_COLORS = {
  pending: "#f59e0b",
  accepted: "#16a34a",
  completed: "#22c55e",
  rejected: "#dc2626",
  default: "#6b7280",
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
