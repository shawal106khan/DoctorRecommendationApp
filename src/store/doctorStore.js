const STORAGE_KEY = "verified_doctors";

export const getDoctors = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveDoctor = (doctor) => {
  const doctors = getDoctors();

  const doctorWithId = {
    ...doctor,
    id: doctor.id || doctor.email,
    role: "doctor", // 🔹 add this line
    specialization: doctor.specialization?.trim() || "",
    isApproved: doctor.isApproved ?? false,
    profileCompleted: doctor.profileCompleted ?? false, // ⭐ important
    licenseFileName: doctor.licenseFileName ?? "",
    licenseFileURL: doctor.licenseFileURL ?? "",
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

export const updateDoctorApproval = (doctorId, status) => {
  const doctors = getDoctors().map((doc) =>
    String(doc.id) === String(doctorId)
      ? {
          ...doc,
          status, // "approved" | "rejected" | "pending"
          isApproved: status === "approved", // keep old compatibility
          rejected: status === "rejected",
        }
      : doc,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(doctors));
};
