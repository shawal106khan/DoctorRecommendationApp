import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  getComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../../../services/contactService";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { MessageSquare, Mail, CheckCircle2, Trash2 } from "lucide-react";

const AdminComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      await updateComplaintStatus(id, "resolved");
      loadComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this complaint?");
    if (!confirmDelete) return;
    try {
      await deleteComplaint(id);
      loadComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const pending = complaints.filter((c) => c.status !== "resolved").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Review and respond to user complaints and feedback
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
              <div>
                <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                  Admin Portal
                </p>
                <h1 className="text-xl font-bold text-[#0D2E4E]">Complaints</h1>
              </div>
            </div>

            {/* Quick stats */}
            {complaints.length > 0 && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <span className="text-[10px] font-bold text-yellow-600">
                    {pending} Pending
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold text-green-600">
                    {resolved} Resolved
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner text="Loading Complaints..." />
            </div>
          ) : complaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center bg-white rounded-2xl border border-[#D6E6F2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                <MessageSquare size={24} className="text-[#1A6FA8]" />
              </div>
              <p className="text-[#0D2E4E] font-bold mb-1">
                No Complaints Found
              </p>
              <p className="text-[#6B839A] text-sm">
                All user complaints will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {complaints.map((complaint) => (
                <div
                  key={complaint.complaint_id}
                  className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden"
                >
                  {/* Top bar */}
                  <div
                    className={`h-1 w-full ${complaint.status === "resolved" ? "bg-gradient-to-r from-green-400 to-emerald-500" : "bg-gradient-to-r from-yellow-400 to-orange-400"}`}
                  />

                  <div className="p-4 sm:p-5">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(26,111,168,0.25)]">
                          <span className="text-white font-bold text-sm">
                            {complaint.full_name?.[0]?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-bold text-[#0D2E4E] text-sm leading-tight">
                            {complaint.full_name}
                          </h2>
                          <p className="text-xs text-[#6B839A] flex items-center gap-1 mt-0.5">
                            <Mail size={10} className="text-[#1A6FA8]" />
                            {complaint.email}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold capitalize px-2.5 py-1 rounded-full border flex-shrink-0 self-start sm:self-auto ml-[52px] sm:ml-0 ${
                          complaint.status === "resolved"
                            ? "bg-green-50 text-green-700 border-green-100"
                            : "bg-yellow-50 text-yellow-600 border-yellow-100"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </div>

                    {/* Subject */}
                    <div className="bg-[#F7FAFE] border border-[#D6E6F2] rounded-xl px-4 py-2.5 mb-3">
                      <p className="text-[9px] font-bold text-[#4A6680] uppercase tracking-wide mb-0.5">
                        Subject
                      </p>
                      <p className="text-sm font-bold text-[#1A6FA8]">
                        {complaint.subject}
                      </p>
                    </div>

                    {/* Message */}
                    <p className="text-sm text-[#6B839A] leading-relaxed mb-5 whitespace-pre-line">
                      {complaint.message}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D6E6F2] to-transparent mb-4" />

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      {complaint.status !== "resolved" && (
                        <button
                          onClick={() => handleResolve(complaint.complaint_id)}
                          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white transition"
                        >
                          <CheckCircle2 size={13} />
                          Mark Resolved
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(complaint.complaint_id)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
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

export default AdminComplaintsPage;
