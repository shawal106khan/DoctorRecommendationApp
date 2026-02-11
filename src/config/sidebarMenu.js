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
  ],

  // ⭐ NEW ADMIN ROLE
  admin: [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Doctors", path: "/admin/doctors", icon: UserCheck },
    { label: "Patients", path: "/admin/patients", icon: Users },
    { label: "Appointments", path: "/admin/appointments", icon: Calendar },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ],
};
