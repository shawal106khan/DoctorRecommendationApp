// TEMP FRONTEND STORE (replace with backend later)

const STORAGE_KEY = "verified_doctors";

export const getDoctors = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// ✅ ADD THIS (DO NOT CHANGE ANYTHING ELSE)
export const getDoctorById = (doctorId) => {
  const doctors = getDoctors();
  return doctors.find((doctor) => doctor.id === doctorId);
};

export const saveDoctor = (doctor) => {
  const doctors = getDoctors();

  const doctorWithId = {
    ...doctor,
    id: doctor.id || doctor.email, // ✅ stable id
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
