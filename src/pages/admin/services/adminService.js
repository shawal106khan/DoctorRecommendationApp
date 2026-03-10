import { getDoctors } from "../../../store/doctorStore";
import { getAppointments } from "../../../store/appointmentStore";
import { getPatients } from "../../../store/patientStore";

export const getAdminStats = async () => {
  const doctors = getDoctors();
  const appointments = getAppointments();
  const patients = getPatients();

  const approvedDoctors = doctors.filter((d) => d.status === "approved").length;
  const rejectedDoctors = doctors.filter((d) => d.status === "rejected").length;
  const pendingDoctors = doctors.filter(
    (d) => !d.status || d.status === "pending",
  ).length;

  return {
    totalDoctors: doctors.length,
    approvedDoctors,
    pendingDoctors,
    rejectedDoctors,

    // ✅ REAL COUNTS
    patients: patients.length,
    appointments: appointments.length,

    doctorStatusData: [
      { label: "Accepted", value: approvedDoctors },
      { label: "Pending Requests", value: pendingDoctors },
      { label: "Rejected", value: rejectedDoctors },
    ],
  };
};
