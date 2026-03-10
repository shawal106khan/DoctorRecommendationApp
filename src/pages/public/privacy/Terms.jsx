const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Effective Date: {new Date().getFullYear()}
        </p>

        {/* Acceptance */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using MedConnect, you agree to comply with these
            Terms & Conditions. If you do not agree, you must discontinue use of
            the platform.
          </p>
        </section>

        {/* User Accounts */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            2. User Accounts
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Users are responsible for maintaining the confidentiality of their
            login credentials. Doctors must provide accurate professional
            information for administrative approval.
          </p>
        </section>

        {/* Doctor Approval */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            3. Doctor Verification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Doctor profiles are subject to administrative review and approval
            before becoming publicly visible on the platform.
          </p>
        </section>

        {/* Appointment Responsibility */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            4. Appointment Booking
          </h2>
          <p className="text-gray-700 leading-relaxed">
            MedConnect facilitates appointment scheduling between patients and
            doctors but does not provide medical services directly.
          </p>
        </section>

        {/* Platform Usage */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            5. Prohibited Activities
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Providing false information</li>
            <li>Unauthorized system access</li>
            <li>Misuse of appointment system</li>
            <li>Any activity that disrupts platform security</li>
          </ul>
        </section>

        {/* Liability */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            MedConnect is not responsible for medical advice, treatment
            outcomes, or disputes between patients and doctors.
          </p>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-xl font-semibold text-indigo-600 mb-3">
            7. Account Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these terms or compromise platform security.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
