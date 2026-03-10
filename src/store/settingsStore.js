const STORAGE_KEY = "admin_settings";

export const defaultSettings = {
  hospitalName: "CareCircle Hospital",
  email: "support@carecircle.com",
  phone: "+92 300 0000000",
  allowRegistration: true,
  appointmentFee: "1500",
};

export const getAdminSettings = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultSettings;
};

export const saveAdminSettings = (settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
