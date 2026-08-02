import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Top Doctors", href: "#top-doctors", id: "top-doctors" },
  { label: "Services", href: "#services", id: "services" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const observers = [];

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="bg-white shadow-[0_2px_24px_rgba(26,111,168,0.10)] sticky top-0 z-50">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#0D2E4E] via-[#1A6FA8] to-[#3cb8a5]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 shadow-[0_2px_8px_rgba(26,111,168,0.25)]">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ label, href, id }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#1A6FA8] bg-[#EAF3FB]"
                    : "text-[#4a6080] hover:text-[#1A6FA8] hover:bg-[#F7FAFE]"
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1A6FA8]" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[#D6E6F2] text-[#4a6080]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Login CTA */}
          <button
            onClick={() => navigate("/login")}
            className="flex h-10 px-3 sm:px-6 bg-[#1A6FA8] hover:bg-[#155e8f] active:scale-[0.98] text-white text-[13px] font-bold rounded-xl items-center gap-1.5 sm:gap-2 transition-all shadow-[0_4px_14px_rgba(26,111,168,0.35)] flex-shrink-0"
          >
            Login
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-[#D6E6F2] px-4 py-3 space-y-1 bg-white">
          {links.map(({ label, href, id }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeSection === id
                  ? "text-[#1A6FA8] bg-[#EAF3FB]"
                  : "text-[#4a6080]"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
