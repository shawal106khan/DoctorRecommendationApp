const DoctorReviews = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">
        Patient Reviews
      </h2>

      <div className="border-t pt-4">
        <p className="font-medium text-green-600">
          I am satisfied with the doctor.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Doctor behaviour was very good and professional 🙂
        </p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {["Great Experience", "Less Wait Time", "Friendly"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border rounded-full text-sm text-green-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorReviews;
