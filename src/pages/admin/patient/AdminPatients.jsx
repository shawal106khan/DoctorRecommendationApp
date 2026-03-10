import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getPatients } from "../../../store/patientStore";

const AdminPatients = () => {
  const [patients] = useState(() => getPatients());

  return (
    <DashboardLayout role="admin">
      <h1 className="text-2xl font-semibold mx-16 mt-4 mb-2 font-serif text-blue-700">
        Patients
      </h1>

      <p className="text-sm text-gray-500 mx-16 mb-6 font-serif">
        Total Registered Patients:{" "}
        <span className="font-semibold text-blue-700">{patients.length}</span>
      </p>

      {patients.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 font-seri">
          No patients registered yet.
        </p>
      ) : (
        <div className="space-y-4 w-full mx-auto px-4 font-serif flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              {/* Patient Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 font-serif">
                  {patient.name}
                </h2>
                <p className="text-sm text-gray-500 font-serif">
                  {patient.email}
                </p>
              </div>

              {/* Badge */}
              <span className="px-4 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                Patient
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminPatients;
