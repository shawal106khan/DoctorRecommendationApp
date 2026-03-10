import toast from "react-hot-toast";

const PREFS_KEY = "admin_prefs";

export const notifyAdmin = (message) => {
  const prefs = JSON.parse(localStorage.getItem(PREFS_KEY));

  if (prefs?.notifications) {
    toast.success(message);
  }
};
