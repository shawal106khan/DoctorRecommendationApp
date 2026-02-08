const STORAGE_KEY = "appointments";

export const getAppointments = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveAppointment = (appointment) => {
  const appointments = getAppointments();
  appointments.push(appointment);
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
