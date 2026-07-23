const features = [
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    title: "Search & Filter Doctors",
    desc: "Find doctors by ratings, specialization, and availability with smart filters.",
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
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Manage Appointments",
    desc: "Book, view, and manage all your appointments from a clean dashboard.",
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Professional Doctor Profiles",
    desc: "Doctors complete detailed profiles — bio, specialization, availability, and more.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      id="services"
      className="py-24 bg-[#336aac] px-6 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white opacity-[0.04]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#38B2A0] opacity-10" />
      <svg
        className="absolute top-10 right-20 w-16 h-16 text-white opacity-10 rotate-45"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            Platform Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            What You Can Do
          </h2>
          <div className="w-16 h-1 bg-[#38B2A0] rounded-full mt-3 mx-auto" />
          <p className="text-white/60 mt-4 text-sm max-w-xl mx-auto">
            Everything you need to connect, manage, and book appointments
            easily.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/25 text-white flex items-center justify-center mb-5 flex-shrink-0">
                {icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
