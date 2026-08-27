import { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  fetchPatientsForAdmin,
  suspendPatient,
  activatePatient,
  softDeletePatient,
} from "../../../services/adminService";
import { sendResetLink } from "../../../services/authService";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../hooks/useLoading";
import {
  Users,
  Mail,
  RefreshCw,
  ShieldOff,
  CheckCircle2,
  Trash2,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  if (status === "active" || !status)
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
        Active
      </span>
    );
  if (status === "suspended")
    return (
      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100">
        Suspended
      </span>
    );
  return (
    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100">
      Deleted
    </span>
  );
};

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading(true);

  const loadPatients = useCallback(async () => {
    try {
      startLoading();
      const data = await fetchPatientsForAdmin();
      setPatients(data);
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    const fetchData = async () => {
      await loadPatients();
    };
    fetchData();
  }, [loadPatients]);

  const handleResetPassword = async (email) => {
    try {
      await sendResetLink(email);
      alert("Reset email sent successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to send reset email");
    }
  };

  const handleSuspend = async (patient) => {
    const reason = prompt("Enter suspension reason");
    if (!reason) return;
    try {
      await suspendPatient(patient.patients_id, reason);
      await loadPatients();
    } catch (err) {
      console.error(err);
      alert("Failed to suspend patient");
    }
  };

  const handleActivate = async (patient) => {
    try {
      await activatePatient(patient.patients_id);
      await loadPatients();
    } catch (err) {
      console.error(err);
      alert("Failed to activate patient");
    }
  };

  const handleDelete = async (patient) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?",
    );
    if (!confirmDelete) return;
    try {
      await softDeletePatient(patient.patients_id);
      await loadPatients();
    } catch (err) {
      console.error(err);
      alert("Failed to delete patient");
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Manage and monitor registered patient accounts
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
              <div>
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                  Admin Portal
                </p>
                <h1 className="text-xl font-bold text-[#0D2E4E]">Patients</h1>
              </div>
            </div>
            {patients.length > 0 && (
              <div className="flex items-center gap-2 bg-white border border-[#D6E6F2] rounded-full px-4 py-1.5 shadow-sm self-start sm:self-auto">
                <Users size={13} className="text-[#1A6FA8]" />
                <span className="text-xs font-bold text-[#1A6FA8]">
                  {patients.length} Registered
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner text="Loading Patients..." />
            </div>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center bg-white rounded-2xl border border-[#D6E6F2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                <Users size={24} className="text-[#1A6FA8]" />
              </div>
              <p className="text-[#0D2E4E] font-bold mb-1">No Patients Yet</p>
              <p className="text-[#6B839A] text-sm">
                Registered patients will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {patients.map((patient) => (
                <div
                  key={patient.patients_id}
                  className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden flex flex-col"
                >
                  {/* Top bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />

                  <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 flex-1">
                    {/* Patient info */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(26,111,168,0.25)]">
                        <span className="text-white font-bold text-sm">
                          {patient.full_name?.[0]?.toUpperCase() || "P"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h2 className="text-sm font-bold text-[#0D2E4E] truncate">
                            {patient.full_name || "Unknown"}
                          </h2>
                          <StatusBadge status={patient.account_status} />
                        </div>
                        <p className="text-xs text-[#6B839A] flex items-center gap-1.5">
                          <Mail size={9} className="text-[#1A6FA8]" />
                          {patient.email || "No Email"}
                        </p>
                        {patient.suspension_reason && (
                          <p className="text-[10px] text-red-500 font-medium mt-1.5 bg-red-50 border border-red-100 rounded-lg px-2.5 py-1">
                            Reason: {patient.suspension_reason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent" />

                    {/* Actions */}
                    {patient.account_status !== "deleted" && (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          {patient.account_status === "suspended" ? (
                            <button
                              onClick={() => handleActivate(patient)}
                              className="flex-1 py-2 text-xs font-bold rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white transition flex items-center justify-center gap-1.5"
                            >
                              <CheckCircle2 size={11} /> Activate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSuspend(patient)}
                              className="flex-1 py-2 text-xs font-bold rounded-xl bg-yellow-50 border border-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition flex items-center justify-center gap-1.5"
                            >
                              <ShieldOff size={11} /> Suspend
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(patient)}
                            className="flex-1 py-2 text-xs font-bold rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-1.5"
                          >
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                        <button
                          onClick={() => handleResetPassword(patient.email)}
                          className="w-full py-2 text-xs font-bold rounded-xl bg-[#F7FAFE] border border-[#D6E6F2] text-[#4A6680] hover:bg-[#E8F4FD] hover:text-[#1A6FA8] flex items-center justify-center gap-1.5 transition"
                        >
                          <RefreshCw size={10} /> Resend Reset Link
                        </button>
                      </div>
                    )}

                    {patient.account_status === "deleted" && (
                      <p className="text-xs text-[#8AAEC8] text-center">
                        This account has been deleted.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPatients;
