const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50 px-6 font-serif">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            About Our Platform
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Our platform is a secure digital space designed to connect patients
            with verified healthcare professionals. We focus on trust,
            transparency, and accessibility.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Every doctor profile is reviewed and approved by our admin team.
            Patients can browse detailed profiles, check ratings, and book
            appointments confidently.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Built with a scalable architecture and role-based security, the
            platform ensures data protection and smooth experience for patients,
            doctors, and administrators.
          </p>
        </div>

        <div className="bg-white p-10 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-indigo-600">
            Why Choose Us?
          </h3>

          <ul className="mt-6 space-y-4 text-gray-600">
            <li>✔ Verified doctor profiles</li>
            <li>✔ Transparent rating system</li>
            <li>✔ Secure role-based access</li>
            <li>✔ Simple and fast booking process</li>
            <li>✔ Admin-controlled quality assurance</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
