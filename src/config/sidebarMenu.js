import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  User,
  Star,
  UserCheck,
  Settings,
  Users,
  Calendar,
  LogOut,
  List,
  FileText,
  AlertCircle,
} from "lucide-react";

export const sidebarMenu = {
  patient: [
    {
      label: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Search Doctors",

      icon: Search,
    },
    {
      label: "Appointments",
      path: "/patient/appointments",
      icon: CalendarCheck,
    },
    { label: "Queue Status", path: "/patient/queue", icon: List }, // ✅
    {
      label: "Profile",
      path: "/patient/profile",
      icon: User,
    },
  ],

  doctor: [
    {
      label: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Appointments",
      path: "/doctor/appointments",
      icon: CalendarCheck,
    },
    {
      label: "Profile",
      path: "/doctor/profile",
      icon: User,
    },
    {
      label: "Reviews",
      path: "/doctor/reviews",
      icon: Star,
    },
    { label: "Monthly Report", path: "/doctor/report", icon: FileText },
  ],

  // ⭐ NEW ADMIN ROLE
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Doctors", path: "/admin/doctors", icon: UserCheck },
    { label: "Patients", path: "/admin/patients", icon: Users },
    { label: "Appointments", path: "/admin/appointments", icon: Calendar },
    {
      label: "Disease Management",
      path: "/admin/disease-management",
      icon: List,
    },
    {
      label: "Health Assistant",
      path: "/admin/health-assistant",
      icon: FileText,
    },
    { label: "Settings", path: "/admin/settings", icon: Settings },
    {
      label: "Complaints",
      path: "/admin/complaints",
      icon: AlertCircle,
    },
    {
      label: "Monthly Reports",
      path: "/admin/monthly-reports",
      icon: FileText,
    },
  ],
};
