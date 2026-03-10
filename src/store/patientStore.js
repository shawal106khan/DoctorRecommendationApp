const STORAGE_KEY = "patients";

export const getPatients = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const savePatient = (patient) => {
  const patients = getPatients();

  const exists = patients.find((p) => p.email === patient.email);
  if (!exists) {
    patients.push(patient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }
};
