import { LayoutDashboard, Search, CalendarCheck, User } from "lucide-react";

export const sidebarMenu = {
  patient: [
    {
      label: "Dashboard",
      path: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Search Doctors",
      path: "/patient/dashboard?search=true",
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
  ],

  admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Verify Doctors",
      path: "/admin/verify-doctors",
      icon: User,
    },
  ],
};
