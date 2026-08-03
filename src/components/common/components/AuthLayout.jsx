import AuthSideImage from "./AuthSideImage";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#336aac] flex items-center justify-center px-4 py-8 sm:p-6 relative overflow-hidden">
      {/* Background circles */}
      <div className="hidden lg:block">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white opacity-5" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-10 left-28 w-36 h-36 rounded-full bg-[#3cb8a5] opacity-20" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white opacity-5" />
        <div className="absolute top-1/2 -left-10 w-24 h-24 rounded-full bg-[#38B2A0] opacity-15" />

        {/* Stethoscope icons */}
        <svg
          className="absolute top-16 left-10 w-24 h-24 text-white opacity-20 rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
        <svg
          className="absolute bottom-28 left-72 w-16 h-20 text-white opacity-20 rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
        <svg
          className="absolute top-20 right-20 w-24 h-24 text-white opacity-20 rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>
        <svg
          className="absolute bottom-28 right-72 w-16 h-20 text-white opacity-20 rotate-45"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
          <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
          <circle cx="20" cy="10" r="2" />
        </svg>

        {/* Search icons */}
        <svg
          className="absolute top-70 left-40 w-20 h-20 text-white opacity-20 -rotate-6"
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
          className="absolute top-20 left-80 w-9 h-9 text-white opacity-20 -rotate-6"
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
          className="absolute bottom-10 left-8 w-10 h-10 text-white opacity-20 -rotate-6"
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
          className="absolute top-70 right-40 w-20 h-20 text-white opacity-20 -rotate-6"
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
          className="absolute top-20 right-80 w-9 h-9 text-white opacity-20 -rotate-6"
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
          className="absolute bottom-10 right-10 w-10 h-10 text-white opacity-20 -rotate-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* White card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl px-5 py-6 sm:px-10 sm:py-10 shadow-[0_20px_60px_rgba(0,0,0,0.20)]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
