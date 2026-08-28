import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { generateAdminMonthlyReport } from "../../../services/adminService";
import { FileText, Banknote, CalendarCheck, Users } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-5 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
    <p className="font-bold text-[#0D2E4E] text-sm">{title}</p>
  </div>
);

const AdminMonthlyReportPage = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const data = await generateAdminMonthlyReport(month, year);
      setReport(data);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = report.reduce((sum, doctor) => sum + doctor.totalFee, 0);

  return (
    <DashboardLayout role="admin">
      <div className="bg-[#F0F4F8] min-h-screen">
        {/* Top strip */}
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-4 sm:px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Generate platform-wide monthly fee and appointment reports
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-12 py-5 sm:py-8 max-w-5xl mx-auto">
          {/* Page header */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Admin Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                Monthly Report
              </h1>
            </div>
          </div>

          {/* Selector card */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden mb-6">
            <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
            <div className="p-4 sm:p-6">
              <SectionHeader title="Select Report Period" />
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end">
                <div className="w-full sm:flex-1 sm:min-w-[140px]">
                  <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                    Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition"
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:flex-1 sm:min-w-[120px]">
                  <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition"
                  >
                    {[2024, 2025, 2026, 2027].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </div>
          </div>

          {/* Report */}
          {report.length > 0 && (
            <>
              {/* Report banner */}
              <div className="bg-gradient-to-br from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] rounded-2xl p-4 sm:p-6 mb-5 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(26,111,168,0.25)]">
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white opacity-5" />
                <div className="absolute bottom-0 left-1/3 w-24 h-24 rounded-full bg-[#38B2A0] opacity-10 blur-xl" />
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">
                      Admin Report
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {MONTHS[month]} {year}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-white/15 border border-white/20 rounded-xl px-4 py-2 text-center">
                      <p className="text-white font-bold text-lg leading-none">
                        PKR {grandTotal.toLocaleString()}
                      </p>
                      <p className="text-white/60 text-[10px] mt-0.5">
                        Grand Total Collected
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-[#1A6FA8] via-[#336aac] to-[#38B2A0]" />
                <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-[#D6E6F2]">
                  <SectionHeader
                    title={`Doctor-wise Breakdown — ${MONTHS[month]} ${year}`}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F7FAFE] border-b border-[#D6E6F2]">
                        <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                          Doctor
                        </th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                          Appointments
                        </th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                          Completed
                        </th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                          Fee Collected
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {report.map((doctor, index) => (
                        <>
                          {/* Doctor row */}
                          <tr
                            key={`doctor-${index}`}
                            className="border-b border-[#F0F4F8] hover:bg-[#F7FAFE] transition"
                          >
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#1A6FA8] to-[#336aac] flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-[9px] font-bold">
                                    {doctor.doctorName?.[0]?.toUpperCase() ||
                                      "D"}
                                  </span>
                                </div>
                                <span className="font-bold text-[#0D2E4E] text-sm">
                                  {doctor.doctorName}
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-[#6B839A] text-sm">
                              {doctor.totalAppointments}
                            </td>
                            <td className="px-5 py-3">
                              <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                                {doctor.completed}
                              </span>
                            </td>
                            <td className="px-5 py-3 font-bold text-green-600 text-sm">
                              PKR {doctor.totalFee.toLocaleString()}
                            </td>
                          </tr>

                          {/* Daily breakdown rows */}
                          {doctor.dailyFees?.map((day, i) => (
                            <tr
                              key={`day-${index}-${i}`}
                              className="bg-[#F7FAFE] border-b border-[#EEF5FC]"
                            >
                              <td className="px-3 sm:px-5 py-2.5 pl-8 sm:pl-14">
                                <div className="flex items-center gap-2 text-xs text-[#6B839A]">
                                  <div className="w-1 h-1 rounded-full bg-[#38B2A0]" />
                                  {day.date}
                                </div>
                              </td>
                              <td className="px-5 py-2.5 text-xs text-[#6B839A]">
                                {day.appointments}
                              </td>
                              <td className="px-5 py-2.5 text-xs text-[#8AAEC8]">
                                —
                              </td>
                              <td className="px-5 py-2.5 text-xs font-semibold text-[#1A6FA8]">
                                PKR {day.totalFee.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr className="bg-gradient-to-r from-[#F0F7FF] to-[#E8F4FD] border-t-2 border-[#D6E6F2]">
                        <td
                          colSpan={3}
                          className="px-5 py-4 font-bold text-[#0D2E4E] text-sm"
                        >
                          Grand Total Collected
                        </td>
                        <td className="px-5 py-4 font-bold text-green-600 text-sm">
                          PKR {grandTotal.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {report.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-[#D6E6F2]">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F4FD] flex items-center justify-center mb-4">
                <FileText size={24} className="text-[#1A6FA8]" />
              </div>
              <p className="text-[#0D2E4E] font-bold mb-1">
                No Report Generated
              </p>
              <p className="text-[#6B839A] text-sm">
                Select a month and year then click Generate Report.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminMonthlyReportPage;
