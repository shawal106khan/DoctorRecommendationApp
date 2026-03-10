import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDoctors, updateDoctorApproval } from "../../store/doctorStore";
import LicenseViewerModal from "./components/LicenseViewerModal";
import { notifyAdmin } from "../../utils/adminNotification";
const AdminDoctors = () => {
  const [doctors, setDoctors] = useState(() => getDoctors());
  const [selectedLicense, setSelectedLicense] = useState(null);

  const loadDoctors = () => setDoctors(getDoctors());

  const handleApprove = (doctorId) => {
    updateDoctorApproval(doctorId, "approved");
    loadDoctors();

    notifyAdmin("Doctor approved successfully");
  };

  const handleReject = (doctorId) => {
    updateDoctorApproval(doctorId, "rejected");
    loadDoctors();

    notifyAdmin("Doctor rejected");
  };

  return (
    <DashboardLayout role="admin">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-400 rounded-sm p-1 text-white mb-5">
        <h1
          className="text-xl font-semibold mx-16 mb-4 mt-4 font-serif
         "
        >
          Doctor Approvals
        </h1>
      </div>
      <div className="bg-white">
        {doctors.length === 0 ? (
          <p className="text-gray-500">No doctors found.</p>
        ) : (
          <div className="space-y-4 w-full flex-1 grid sm:grid-cols-2 lg:grid-cols-2  m-auto">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-gray-50 p-5 rounded-sm shadow-md flex flex-col md:flex-row md:items-center
                 md:justify-between gap-2 font-serif mx-2"
              >
                {/* Doctor Info */}
                <div className=" m-2">
                  <h2 className="text-lg font-semibold font-mono py-1">
                    {doc.name}
                  </h2>
                  <p className="text-sm text-blue-500">{doc.email}</p>
                  <p className="text-sm text-gray-500">
                    {doc.specialization} • {doc.experienceYears} yrs
                  </p>
                  <p className="text-xs text-green-600 mt-1 font-semibold">
                    License Number: {doc.licenseNumber}
                  </p>

                  {/* Show uploaded license */}
                  {doc.licenseFileName && (
                    <p className="text-xs text-gray-500 mt-1">
                      {doc.licenseFileName}
                    </p>
                  )}
                  {doc.licenseFileURL && (
                    <button
                      onClick={() =>
                        setSelectedLicense({
                          url: doc.licenseFileURL,
                          name: doc.licenseFileName,
                        })
                      }
                      className="text-blue-600 text-xs mt-1 underline hover:text-blue-800 block"
                    >
                      View License
                    </button>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row items-center gap-2  relative lg:top-12">
                  {doc.status === "approved" ? (
                    <span className="px-4 py-2 text-xs rounded-full bg-green-200 text-green-700">
                      Approved
                    </span>
                  ) : doc.status === "rejected" ? (
                    <span className="px-4 py-2 text-xs rounded-full bg-red-200 text-red-700">
                      Rejected
                    </span>
                  ) : (
                    <>
                      <span className="px-4 py-2 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>

                      <button
                        onClick={() => handleApprove(doc.id)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(doc.id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <LicenseViewerModal
          open={!!selectedLicense}
          onClose={() => setSelectedLicense(null)}
          fileURL={selectedLicense?.url}
          fileName={selectedLicense?.name}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDoctors;
