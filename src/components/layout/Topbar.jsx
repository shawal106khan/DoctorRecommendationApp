import { useState, useRef, useEffect } from "react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const Topbar = ({ logoSrc, onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const role = user?.role;
  const userName = user?.full_name || user?.name;

  const userImage = user?.profile_picture || user?.avatar;

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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#D6E6F2] shadow-[0_2px_16px_rgba(26,111,168,0.08)]">
      {/* Thin gradient top line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />

      <div className="h-16 flex items-center justify-between px-6">
        {/* ── LEFT ── */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden w-14 h-14 rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] flex items-center justify-center text-[#4A6680] hover:text-[#1A6FA8] hover:border-[#1A6FA8]/30 transition"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          {/* Logo only — no brand text */}
          <img
            src={logoSrc}
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* ── RIGHT ── */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2.5 bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl px-3 py-1.5 hover:border-[#1A6FA8]/40 hover:shadow-sm transition-all focus:outline-none"
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white flex items-center justify-center font-bold overflow-hidden flex-shrink-0">
              {userImage ? (
                <img
                  src={userImage}
                  alt="User"
                  className="w-7 h-7 object-cover"
                />
              ) : (
                <span className="text-xs">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <span className="hidden sm:block text-sm font-semibold text-[#0D2E4E] max-w-[120px] truncate">
              {userName}
            </span>

            <ChevronDownIcon
              className={`w-3.5 h-3.5 text-[#8AAEC8] hidden sm:block transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-56 bg-white border border-[#D6E6F2] rounded-2xl shadow-[0_12px_32px_rgba(26,111,168,0.14)] transition-all duration-200 overflow-hidden
            ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
          >
            {/* User info header */}
            <div className="bg-gradient-to-br from-[#1A6FA8] to-[#336aac] px-4 py-3 relative overflow-hidden">
              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-white opacity-5" />
              <div className="flex items-center gap-2.5 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/25 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt="User"
                      className="w-8 h-8 object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm truncate">
                    {userName}
                  </p>
                  <p className="text-white/60 text-[10px] capitalize font-medium">
                    {role}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-1.5">
              <button
                onClick={() => {
                  if (role) navigate(`/${role}/profile`);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm text-[#0D2E4E] font-medium hover:bg-[#F7FAFE] rounded-xl transition flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-[#1A6FA8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                Profile
              </button>

              <div className="h-px bg-[#EEF5FC] mx-2 my-1" />

              <button
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true });
                }}
                className="w-full text-left px-3 py-2.5 text-sm text-red-500 font-medium hover:bg-red-50 rounded-xl transition flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                </div>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
