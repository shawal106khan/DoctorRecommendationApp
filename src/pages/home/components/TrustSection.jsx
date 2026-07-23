const trustItems = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Admin Verified Doctors",
    desc: "Every doctor profile is reviewed and approved before being visible to patients.",
    color: "bg-[#E8F4FD] text-[#1A6FA8]",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Secure Role-Based Access",
    desc: "Separate dashboards for patients, doctors, and administrators.",
    color: "bg-teal-50 text-[#38B2A0]",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Transparent Ratings",
    desc: "Patients can view doctor ratings and profile details before booking.",
    color: "bg-yellow-50 text-yellow-500",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-[#F7FAFE] px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Why Trust Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2E4E] tracking-tight">
            Why Patients Trust Our Platform
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] rounded-full mt-3 mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {trustItems.map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 shadow-[0_4px_20px_rgba(26,111,168,0.08)] border border-[#D6E6F2] hover:shadow-[0_8px_32px_rgba(26,111,168,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 ${color}`}
              >
                {icon}
              </div>
              <h3 className="text-[#0D2E4E] font-bold text-base mb-2">
                {title}
              </h3>
              <p className="text-[#6B839A] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
