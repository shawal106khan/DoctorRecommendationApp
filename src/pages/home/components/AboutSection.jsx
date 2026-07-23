const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E8F4FD] text-[#1A6FA8] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            About Our Platform
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D2E4E] tracking-tight leading-tight mb-4">
            Built for Trust,{" "}
            <span className="text-[#1A6FA8]">Transparency</span> & Accessibility
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] rounded-full mb-6" />

          <div className="space-y-4 text-[#6B839A] text-sm leading-relaxed">
            <p>
              Our platform is a secure digital space designed to connect
              patients with verified healthcare professionals. We focus on
              trust, transparency, and accessibility.
            </p>
            <p>
              Every doctor profile is reviewed and approved by our admin team.
              Patients can browse detailed profiles, check ratings, and book
              appointments confidently.
            </p>
            <p>
              Built with a scalable architecture and role-based security, the
              platform ensures data protection and smooth experience for
              patients, doctors, and administrators.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-2xl p-8 shadow-[0_8px_30px_rgba(26,111,168,0.08)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center shadow-[0_4px_12px_rgba(26,111,168,0.30)]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-[#0D2E4E] font-bold text-lg">Why Choose Us?</h3>
          </div>

          <ul className="space-y-3">
            {[
              "Verified doctor profiles",
              "Transparent rating system",
              "Secure role-based access",
              "Simple and fast booking process",
              "Admin-controlled quality assurance",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-[#6B839A] text-sm"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#1A6FA8] to-[#336aac] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
