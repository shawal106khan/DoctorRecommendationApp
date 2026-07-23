import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import LicenseViewerModal from "./components/LicenseViewerModal";
import { notifyAdmin } from "../../utils/adminNotification";
import {
  approveDoctor,
  fetchDoctorsForAdmin,
  rejectDoctor,
  suspendDoctor,
  activateDoctor,
  softDeleteDoctor,
} from "../../services/adminService";
import { createLicenseSignedUrl } from "../../services/licenseService";
import LoadingSpinner from "../../components/common/components/LoadingSpinner";
import { sendResetLink } from "../../services/authService";
import {
  ShieldCheck,
  FileText,
  Mail,
  Briefcase,
  RefreshCw,
} from "lucide-react";

const StatusBadge = ({ status, accountStatus }) => {
  if (accountStatus === "deleted")
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
        Deleted
      </span>
    );
  if (accountStatus === "suspended")
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
        Suspended
      </span>
    );
  if (status === "approved")
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
        Approved
      </span>
    );
  if (status === "rejected")
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100">
        Rejected
      </span>
    );
  return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100">
      Pending
    </span>
  );
};

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const data = await fetchDoctorsForAdmin();
      setDoctors(data);
    } catch (err) {
      notifyAdmin("Failed to load doctors.", err.message);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      await loadDoctors();
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  const handleResetPassword = async (email) => {
    try {
      await sendResetLink(email);
      alert("Reset email sent successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset email");
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await approveDoctor(doctorId);
      loadDoctors();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (doctorId) => {
    try {
      await rejectDoctor(doctorId);
      loadDoctors();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSuspend = async (doctorId) => {
    try {
      const reason = prompt("Enter suspension reason");
      if (!reason) return;
      await suspendDoctor(doctorId, reason);
      loadDoctors();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleActivate = async (doctorId) => {
    try {
      await activateDoctor(doctorId);
      loadDoctors();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (doctorId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this doctor account?",
      );
      if (!confirmDelete) return;
      await softDeleteDoctor(doctorId);
      loadDoctors();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Review and manage doctor verification requests
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
              <div>
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                  Admin Portal
                </p>
                <h1 className="text-xl font-bold text-[#0D2E4E]">
                  Doctor Approvals
                </h1>
              </div>
            </div>
            {doctors.length > 0 && (
              <div className="bg-white border border-[#D6E6F2] text-[#1A6FA8] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                {doctors.length} Doctors
              </div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner text="Loading Doctors..." />
            </div>
          ) : doctors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-[#D6E6F2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-[#1A6FA8]" />
              </div>
              <p className="text-[#0D2E4E] font-bold mb-1">No Doctors Found</p>
              <p className="text-[#6B839A] text-sm">
                Doctor registrations will appear here.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {doctors.map((doc) => (
                <div
                  key={doc.doctors_id}
                  className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden flex flex-col"
                >
                  {/* Top bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    {/* Doctor info */}
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(26,111,168,0.25)]">
                        <span className="text-white font-bold text-base">
                          {doc.name?.[0]?.toUpperCase() || "D"}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="text-sm font-bold text-[#0D2E4E]">
                            {doc.name}
                          </h2>
                          <StatusBadge
                            status={doc.status}
                            accountStatus={doc.account_status}
                          />
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                            <Briefcase size={9} className="text-[#1A6FA8]" />
                            {doc.specialization} · {doc.experience_years || 0}{" "}
                            yrs exp
                          </p>
                          {/* <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                            <Mail size={9} className="text-[#1A6FA8]" />
                            {doc.email}
                          </p> */}
                          <p className="text-xs text-[#38B2A0] font-semibold flex items-center gap-1.5">
                            <ShieldCheck size={9} />
                            License: {doc.license_number}
                          </p>
                        </div>

                        {/* License file */}
                        {doc.licenseFileURL && (
                          <button
                            onClick={async () => {
                              const signedUrl = await createLicenseSignedUrl(
                                doc.licenseFileURL,
                                60 * 60,
                              );
                              if (!signedUrl) return;
                              setSelectedLicense({
                                url: signedUrl,
                                name: doc.licenseFileName,
                              });
                            }}
                            className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-[#1A6FA8] bg-[#E8F4FD] border border-[#D6E6F2] px-2.5 py-1 rounded-full hover:bg-[#1A6FA8] hover:text-white transition"
                          >
                            <FileText size={10} />
                            View License
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {doc.account_status === "deleted" ? (
                        <span className="text-xs text-[#8AAEC8]">
                          This account has been deleted.
                        </span>
                      ) : doc.account_status === "suspended" ? (
                        <>
                          <button
                            onClick={() => handleActivate(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white transition"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleDelete(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-700 hover:text-white transition"
                          >
                            Delete
                          </button>
                        </>
                      ) : doc.status === "approved" ? (
                        <>
                          <button
                            onClick={() => handleSuspend(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                          >
                            Suspend
                          </button>
                          <button
                            onClick={() => handleDelete(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-700 hover:text-white transition"
                          >
                            Delete
                          </button>
                        </>
                      ) : doc.status === "rejected" ? (
                        <span className="text-xs text-[#8AAEC8]">
                          This application was rejected.
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(doc.doctors_id)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Reset password — always shown */}
                      <button
                        onClick={() => handleResetPassword(doc.email)}
                        className="w-full py-2 text-xs font-bold rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] text-[#4A6680] hover:bg-[#E8F4FD] hover:text-[#1A6FA8] flex items-center justify-center gap-1.5 transition"
                      >
                        <RefreshCw size={10} />
                        Resend Reset Link
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

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
