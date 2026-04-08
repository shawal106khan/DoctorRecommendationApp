import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../lib/supabase";
import { getAdminByUserId } from "../services/adminService";
import { getDoctorByUserId, getPatientByUserId } from "../services/userService";

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  // ✅ initialize from localStorage (refresh-safe)
  const [doctorProfile, setDoctorProfile] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const syncUserFromDb = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) {
        setUser(null);
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setUser(null);
        return;
      }

      const authUser = data.user;

      try {
        const admin = await getAdminByUserId(authUser.id);
        if (admin) {
          setUser({ ...admin, role: "admin" });
          return;
        }
      } catch (err) {
        console.log("Not an admin:", err.message);
      }

      try {
        const doctor = await getDoctorByUserId(authUser.id);
        if (doctor) {
          setUser({ ...doctor, role: "doctor" });
          return;
        }
      } catch (err) {
        console.log("Not a doctor:", err.message);
      }

      try {
        const patient = await getPatientByUserId(authUser.id);
        if (patient) {
          setUser({ ...patient, role: "patient" });
          return;
        }
      } catch (err) {
        console.log("Not a patient:", err.message);
      }

      setUser(null);
    };

    syncUserFromDb();
  }, []);

  // ✅ sync user → localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // ✅ memoized context value (performance-safe)
  const value = useMemo(
    () => ({ user, setUser, logout, doctorProfile, setDoctorProfile }),
    [user, doctorProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
