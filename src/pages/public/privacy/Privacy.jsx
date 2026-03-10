const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Last Updated: {new Date().getFullYear()}
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            1. Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed">
            MedConnect is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your information
            when you use our doctor appointment platform.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            2. Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Personal information (name, email, contact details)</li>
            <li>Account credentials</li>
            <li>Doctor profile information (qualification, specialization)</li>
            <li>Appointment booking data</li>
            <li>Usage and activity logs</li>
          </ul>
        </section>

        {/* How We Use Data */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>To provide secure appointment booking services</li>
            <li>To verify and approve doctor profiles</li>
            <li>To manage patient and doctor dashboards</li>
            <li>To improve platform functionality</li>
            <li>To ensure platform security and prevent fraud</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            4. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement role-based authentication, secure access controls, and
            administrative approval systems to protect user data from
            unauthorized access.
          </p>
        </section>

        {/* Sharing */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            5. Information Sharing
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We do not sell or rent your personal information. Information is
            shared only when necessary to facilitate appointments between
            patients and verified doctors.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            6. Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Users may request account updates, corrections, or deletion of their
            information by contacting platform administration.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            7. Contact Us
          </h2>
          <p className="text-gray-700">
            For privacy-related inquiries, please contact us through the
            official platform contact section.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
