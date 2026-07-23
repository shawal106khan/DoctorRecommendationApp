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

      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
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

        {/* Login CTA */}
        <button
          onClick={() => navigate("/login")}
          className="h-10 px-6 bg-[#1A6FA8] hover:bg-[#155e8f] active:scale-[0.98] text-white text-[13px] font-bold rounded-xl flex items-center gap-2 transition-all shadow-[0_4px_14px_rgba(26,111,168,0.35)] flex-shrink-0"
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
    </header>
  );
};

export default PublicNavbar;
