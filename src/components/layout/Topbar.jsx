import React, { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
const Topbar = ({ logoSrc, title, userName, userImage, onMenuClick, role }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 w-full bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-700 hover:text-black focus:outline-none"
        >
          <Bars3Icon className="w-7 h-7" />
        </button>

        <img src={logoSrc} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-lg font-semibold text-gray-900">{title}</span>
      </div>

      {/* Right */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {userName}
          </span>

          <img
            src={userImage || "/src/assets/profile-pictur.png"}
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />

          <ChevronDownIcon className="w-4 h-4 text-gray-600 hidden sm:block" />
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md transition-all duration-200
          ${
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="px-4 py-2 text-xs text-gray-500 border-b">
            Role: <span className="font-medium capitalize">{role}</span>
          </div>

          {role === "admin" && (
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Admin Panel
            </button>
          )}

          <button
            onClick={() => navigate(`/${role}/profile`)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
