const STORAGE_KEY = "verified_doctors";

export const getDoctors = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveDoctor = (doctor) => {
  const doctors = getDoctors();

  const doctorWithId = {
    ...doctor,
    id: doctor.id || doctor.email, // stable id
    specialization: doctor.specialization?.trim() || "",
  };

  const index = doctors.findIndex((d) => d.id === doctorWithId.id);

  if (index !== -1) {
    doctors[index] = doctorWithId;
  } else {
    doctors.push(doctorWithId);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
};

export const getDoctorById = (doctorId) => {
  return getDoctors().find((doctor) => String(doctor.id) === String(doctorId));
};
