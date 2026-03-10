import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getAppointments } from "../../../store/appointmentStore";

const AdminAppointments = () => {
  const [appointments] = useState(() => getAppointments());

  return (
    <DashboardLayout role="admin">
      <h1 className="text-2xl font-semibold mx-6 mt-6 text-blue-700 font-serif">
        All Appointments
      </h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500 mx-6 mt-4">No appointments found.</p>
      ) : (
        <div className="space-y-4  mx-auto mt-6 px-4 font-serif  flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white border border-gray-100
               rounded-xl shadow-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* LEFT INFO */}
              <div className="ml-3">
                <p className="font-semibold text-gray-900 ">
                  Patient: {appt.patientName}
                </p>
                <p className="text-sm text-gray-600">
                  Doctor: {appt.doctorName}
                </p>
                <p className="text-sm text-gray-500">
                  {appt.date} • {appt.time}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`px-4 py-1 text-xs rounded-full font-medium
                  ${
                    appt.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminAppointments;
