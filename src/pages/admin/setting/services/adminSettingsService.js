const PROFILE_KEY = "admin_profile";
const PREFS_KEY = "admin_prefs";
const SETTINGS_KEY = "admin_settings";

/* ================= PROFILE ================= */

export const getAdminProfile = async () => {
  // Backend-ready structure (replace with Supabase later)
  const stored = localStorage.getItem(PROFILE_KEY);

  return stored
    ? JSON.parse(stored)
    : {
        id: "",
        name: "",
        email: "",
        contact: "",
        avatar: "",
        role: "admin",
      };
};

export const updateAdminProfile = async (data) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  return { success: true, data };
};

/* ================= SETTINGS ================= */

export const getAdminSettings = async () => {
  const stored = localStorage.getItem(SETTINGS_KEY);

  return stored
    ? JSON.parse(stored)
    : {
        id: "",
        support_email: "",
        support_phone: "",
        updated_at: "",
      };
};

export const updateAdminSettings = async (data) => {
  const payload = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(payload));
  return { success: true, data: payload };
};

/* ================= PREFERENCES ================= */

export const getAdminPreferences = async () => {
  const stored = localStorage.getItem(PREFS_KEY);

  return stored
    ? JSON.parse(stored)
    : {
        notifications: true,
        darkMode: false,
      };
};

export const updateAdminPreferences = async (prefs) => {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  return { success: true };
};
