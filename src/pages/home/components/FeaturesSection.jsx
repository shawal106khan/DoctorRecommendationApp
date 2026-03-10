const FeaturesSection = () => {
  return (
    <section id="services" className="py-24 bg-white px-6 font-serif">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          What You Can Do
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Everything you need to connect, manage, and book appointments easily.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-10 text-left">
          <div className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Search & Filter Doctors
            </h3>
            <p className="mt-4 text-gray-600">
              Find doctors by ratings, and availability.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Manage Appointments
            </h3>
            <p className="mt-4 text-gray-600">
              Book, view, and manage appointments from your dashboard.
            </p>
          </div>

          <div className="p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Professional Doctor Profiles
            </h3>
            <p className="mt-4 text-gray-600">
              Doctors can complete and manage detailed professional profiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
