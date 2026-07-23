import { useState, useEffect } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import { supabase } from "../../../../lib/supabase";
import {
  getDoctorByUserId,
  getUserData,
} from "../../../../services/userService";
import LoadingSpinner from "../../../../components/common/components/LoadingSpinner";
import {
  FileText,
  Banknote,
  CalendarCheck,
  Users,
  TrendingUp,
} from "lucide-react";
import ButtonLoader from "../../../../components/common/components/ButtonLoader";

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

const MonthlyReportPage = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { userId } = await getUserData();
        const doctor = await getDoctorByUserId(userId);
        if (doctor) setDoctorId(doctor.doctors_id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const generateReport = async () => {
    if (!doctorId) return;
    setGenerating(true);

    try {
      // Get start and end of selected month
      const startDate = new Date(selectedYear, selectedMonth, 1)
        .toISOString()
        .split("T")[0];
      const endDate = new Date(selectedYear, selectedMonth + 1, 0)
        .toISOString()
        .split("T")[0];

      const { data, error } = await supabase
        .from("appointments")
        .select(
          `
          appointment_id,
          patient_name,
          appointment_date,
          status,
          fee_paid,
          queue_number
        `,
        )
        .eq("doctors_id", doctorId)
        .gte("appointment_date", startDate)
        .lte("appointment_date", endDate)
        .order("appointment_date", { ascending: true });

      if (error) throw error;

      const appointments = data || [];

      // Calculate stats
      const totalAppointments = appointments.length;
      const completed = appointments.filter((a) => a.status === "completed");
      const pending = appointments.filter((a) => a.status === "pending").length;
      const approved = appointments.filter((a) =>
        ["approved", "accepted"].includes(a.status),
      ).length;
      const cancelled = appointments.filter((a) =>
        ["rejected", "cancelled"].includes(a.status),
      ).length;
      const totalFeeCollected = completed.reduce(
        (sum, a) => sum + (Number(a.fee_paid) || 0),
        0,
      );
      const waivedCount = completed.filter(
        (a) => Number(a.fee_paid) === 0,
      ).length;

      const dailyFeeMap = {};

      completed.forEach((a) => {
        const date = a.appointment_date;

        if (!dailyFeeMap[date]) {
          dailyFeeMap[date] = {
            date,
            totalFee: 0,
            appointments: 0,
          };
        }

        dailyFeeMap[date].totalFee += Number(a.fee_paid || 0);
        dailyFeeMap[date].appointments += 1;
      });

      const dailyFeeReport = Object.values(dailyFeeMap);

      setReport({
        month: MONTHS[selectedMonth],
        year: selectedYear,
        totalAppointments,
        completed: completed.length,
        pending,
        approved,
        cancelled,
        totalFeeCollected,
        waivedCount,
        appointments,
        dailyFeeReport,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout role="doctor">
      <div className="bg-[#F0F4F8] min-h-screen">
        <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            Generate your monthly appointment and fee report
          </p>
        </div>

        <div className="px-6 lg:px-12 py-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
            <div>
              <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
                Doctor Portal
              </p>
              <h1 className="text-xl font-bold text-[#0D2E4E]">
                Monthly Report
              </h1>
            </div>
          </div>

          {/* Month/Year selector */}
          <div className="bg-white rounded-2xl border border-[#D6E6F2] p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} className="text-[#1A6FA8]" />
              <p className="font-bold text-[#0D2E4E] text-sm">Select Period</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                  Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-[10px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="w-full h-11 px-4 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10"
                >
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={generateReport}
                  disabled={generating}
                  className="h-11 px-6 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  {generating ? (
                    <ButtonLoader text="Generating..." />
                  ) : (
                    "Generate Report"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Report */}
          {report && (
            <>
              {/* Title */}
              <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] rounded-2xl p-5 mb-6 text-white">
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                  Monthly Report
                </p>
                <h2 className="text-2xl font-bold">
                  {report.month} {report.year}
                </h2>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4">
                  <div className="w-8 h-8 rounded-xl bg-[#E8F4FD] flex items-center justify-center mb-3">
                    <Users size={15} className="text-[#1A6FA8]" />
                  </div>
                  <p className="text-2xl font-bold text-[#0D2E4E]">
                    {report.totalAppointments}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">
                    Total Appointments
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4">
                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                    <CalendarCheck size={15} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {report.completed}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">Completed</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4">
                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center mb-3">
                    <Banknote size={15} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    PKR {report.totalFeeCollected.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">
                    Total Fee Collected
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-[#D6E6F2] p-4">
                  <div className="w-8 h-8 rounded-xl bg-yellow-50 flex items-center justify-center mb-3">
                    <TrendingUp size={15} className="text-yellow-600" />
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {report.waivedCount}
                  </p>
                  <p className="text-xs text-[#6B839A] mt-0.5">Fee Waived</p>
                </div>
              </div>

              {/* Status breakdown */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] p-5 mb-6">
                <p className="font-bold text-[#0D2E4E] text-sm mb-4">
                  Status Breakdown
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Completed",
                      value: report.completed,
                      color: "text-green-600 bg-green-50",
                    },
                    {
                      label: "In Queue",
                      value: report.approved,
                      color: "text-blue-600 bg-blue-50",
                    },
                    {
                      label: "Pending",
                      value: report.pending,
                      color: "text-yellow-600 bg-yellow-50",
                    },
                    {
                      label: "Cancelled",
                      value: report.cancelled,
                      color: "text-red-500 bg-red-50",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`rounded-xl px-4 py-3 ${s.color}`}
                    >
                      <p className="text-xl font-bold">{s.value}</p>
                      <p className="text-xs font-semibold mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#D6E6F2] p-5 mb-6">
                <p className="font-bold text-[#0D2E4E] text-sm mb-4">
                  Daily Fee Summary
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F7FAFE]">
                        <th className="text-left px-4 py-3">Date</th>
                        <th className="text-left px-4 py-3">
                          Completed Appointments
                        </th>
                        <th className="text-left px-4 py-3">Total Fee</th>
                      </tr>
                    </thead>

                    <tbody>
                      {report.dailyFeeReport?.map((day) => (
                        <tr key={day.date} className="border-b">
                          <td className="px-4 py-3">
                            {new Date(day.date).toLocaleDateString()}
                          </td>

                          <td className="px-4 py-3">{day.appointments}</td>

                          <td className="px-4 py-3 font-semibold text-green-600">
                            PKR {day.totalFee.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Appointments table */}
              <div className="bg-white rounded-2xl border border-[#D6E6F2] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#D6E6F2]">
                  <p className="font-bold text-[#0D2E4E] text-sm">
                    All Appointments — {report.month} {report.year}
                  </p>
                </div>

                {report.appointments.length === 0 ? (
                  <div className="p-8 text-center text-[#6B839A] text-sm">
                    No appointments found for this month.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F7FAFE] border-b border-[#D6E6F2]">
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            #
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Patient
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Date
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Status
                          </th>
                          <th className="text-left px-5 py-3 text-[10px] font-bold text-[#4A6680] uppercase tracking-wide">
                            Fee Paid
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0F4F8]">
                        {report.appointments.map((a, index) => (
                          <tr
                            key={a.appointment_id}
                            className="hover:bg-[#F7FAFE] transition"
                          >
                            <td className="px-5 py-3 text-[#6B839A] text-xs">
                              {index + 1}
                            </td>
                            <td className="px-5 py-3 font-semibold text-[#0D2E4E]">
                              {a.patient_name || "-"}
                            </td>
                            <td className="px-5 py-3 text-[#6B839A]">
                              {a.appointment_date
                                ? new Date(
                                    a.appointment_date,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "-"}
                            </td>
                            <td className="px-5 py-3">
                              <span
                                className={`text-[10px] font-bold capitalize px-2.5 py-1 rounded-full ${
                                  a.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : a.status === "pending"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : a.status === "approved"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-red-100 text-red-600"
                                }`}
                              >
                                {a.status}
                              </span>
                            </td>
                            <td className="px-5 py-3 font-semibold text-[#0D2E4E]">
                              {a.status === "completed"
                                ? `PKR ${Number(a.fee_paid) || 0}`
                                : "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {/* Total row */}
                      <tfoot>
                        <tr className="bg-[#F7FAFE] border-t-2 border-[#D6E6F2]">
                          <td
                            colSpan={4}
                            className="px-5 py-3 font-bold text-[#0D2E4E] text-sm"
                          >
                            Total Fee Collected
                          </td>
                          <td className="px-5 py-3 font-bold text-green-600 text-sm">
                            PKR {report.totalFeeCollected.toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MonthlyReportPage;
