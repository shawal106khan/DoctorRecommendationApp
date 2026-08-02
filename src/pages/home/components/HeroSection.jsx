import { useNavigate } from "react-router-dom";

import HeroImg from "../../../assets/find-doctor.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");

      return;
    }

    if (user.role === "patient") {
      navigate("/login");

      return;
    }
  };

  const handleJoinDoctor = () => {
    navigate("/signup");
  };

  return (
    <section className="relative min-h-[80vh] py-9 flex items-center overflow-hidden ">
      {/* Overlay — brand blue gradient */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#0D2E4E]/95 via-[#1A6FA8]/85 to-[#336aac]/80" />

      {/* Decorative circles — matching admin page style */}

      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-[0.04]" />

      <div className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-[#3cb8a5] opacity-10" />

      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-white opacity-[0.04]" />

      {/* Decorative medical SVG icons — same as admin */}

      <svg
        className="hidden sm:block absolute top-16 left-10 w-20 h-20 text-white opacity-10 rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />

        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />

        <circle cx="20" cy="10" r="2" />
      </svg>

      <svg
        className="hidden sm:block absolute bottom-20 right-16 w-16 h-16 text-white opacity-10 -rotate-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8" />

        <path d="m21 21-4.35-4.35" />
      </svg>

      <svg
        className="hidden sm:block absolute top-1/2 right-10 w-10 h-10 text-white opacity-10 rotate-45"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />

        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />

        <circle cx="20" cy="10" r="2" />
      </svg>

      {/* Content */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          {/* Badge */}

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#3cb8a5] animate-pulse" />

            <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
              Trusted Healthcare Platform
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Find Verified Doctors &{" "}
            <span className="text-[#3cb8a5]">Book Appointments</span> Instantly
          </h1>

          <p className="mt-6 text-blue-100/80 text-base sm:text-lg max-w-xl leading-relaxed">
            Search approved doctors, view complete profiles, check ratings, and
            book secure appointments — all in one place.
          </p>

          {/* CTA Buttons */}

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleFindDoctor}
              className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#1A6FA8] text-sm font-bold rounded-xl  hover:bg-[#bed7f7] active:scale-[0.99] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />

                <path d="m21 21-4.35-4.35" />
              </svg>
              Login & Find a Doctor
            </button>

            <button
              onClick={handleJoinDoctor}
              className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-white/40 text-white text-sm font-bold rounded-xl hover:bg-white/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />

                <circle cx="9" cy="7" r="4" />

                <line x1="19" y1="8" x2="19" y2="14" />

                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              Join as Doctor
            </button>
          </div>

          {/* Trust indicators */}

          <div className="mt-6 grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-5">
            {[
              {
                label: "Verified Doctors",

                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },

              {
                label: "Secure Booking",

                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />

                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
              },

              {
                label: "Rated Profiles",

                icon: (
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs text-white/80 font-semibold backdrop-blur-sm"
              >
                <span className="text-[#3cb8a5]">{icon}</span>

                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
