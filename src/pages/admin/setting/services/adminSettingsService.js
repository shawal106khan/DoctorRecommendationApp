const PROFILE_KEY = "admin_profile";
const PREFS_KEY = "admin_prefs";

/* ================= PROFILE ================= */

export const getAdminProfile = async () => {
  // 🔥 Backend ready structure
  // Later replace with:
  // const res = await axios.get("/api/admin/profile")
  // return res.data;

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
  // 🔥 Later:
  // await axios.put("/api/admin/profile", data);

  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
  return { success: true, data };
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
