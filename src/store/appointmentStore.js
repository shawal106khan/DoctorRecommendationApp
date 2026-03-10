import { getDoctors } from "./doctorStore";
const STORAGE_KEY = "appointments";

export const getAppointments = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveAppointment = (appointment) => {
  const appointments = getAppointments();

  // 🔎 find doctor from doctorId
  const doctor = getDoctors().find(
    (d) => String(d.email) === String(appointment.doctorId),
  );

  const newAppointment = {
    id: appointment.id || Date.now(),
    status: appointment.status || "pending",
    createdAt: appointment.createdAt || new Date().toISOString(),

    ...appointment,

    // ✅ AUTO-SET doctor name (REAL FIX)
    doctorName: doctor?.name || "Unknown Doctor",
    patientName: appointment.patientName || "",
  };

  appointments.push(newAppointment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const getAppointmentsByDoctor = (doctorId) => {
  return getAppointments().filter(
    (a) => String(a.doctorId) === String(doctorId),
  );
};

export const getAppointmentsByPatient = (patientEmail) => {
  return getAppointments().filter((a) => a.patientEmail === patientEmail);
};

export const updateAppointmentStatus = (id, status) => {
  const appointments = getAppointments().map((a) => {
    if (a.id !== id) return a;

    return {
      ...a,
      status, // 🔴 KEEP STATUS AS IS
      timeline: [
        ...(a.timeline || []),
        {
          state: status === "pending" ? "requested" : status,
          at: new Date().toISOString(),
        },
      ],
    };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};
export const addAppointmentReview = (appointmentId, review) => {
  const appointments = getAppointments().map((a) =>
    a.id === appointmentId
      ? {
          ...a,
          review: {
            ...review,
            createdAt: new Date().toISOString(),
          },
        }
      : a,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};
