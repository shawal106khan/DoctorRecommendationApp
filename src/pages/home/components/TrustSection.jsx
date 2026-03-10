const TrustSection = () => {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Patients Trust Our Platform
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10 font-serif">
          <div className="">
            <h3 className="text-xl font-semibold text-indigo-600">
              Admin Verified Doctors
            </h3>
            <p className="mt-3 text-gray-600">
              Every doctor profile is reviewed and approved before being
              visible.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">
              Secure Role-Based Access
            </h3>
            <p className="mt-3 text-gray-600">
              Separate dashboards for patients, doctors, and administrators.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-indigo-600">
              Transparent Ratings
            </h3>
            <p className="mt-3 text-gray-600">
              Patients can view doctor ratings and profile details before
              booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
