import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { supabase } from "../lib/supabase";
import { getAdminByUserId } from "../services/adminService";
import { getDoctorByUserId, getPatientByUserId } from "../services/userService";
import { fetchDoctorsTopbarInfo } from "../services/doctorService";
const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  // ✅ initialize from localStorage (refresh-safe)
  const [doctorProfile, setDoctorProfile] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    // ✅ prevent suspended doctor cached login
    if (
      parsedUser?.role === "doctor" &&
      (parsedUser?.account_status === "suspended" ||
        parsedUser?.account_status === "deleted")
    ) {
      localStorage.removeItem(STORAGE_KEY);

      return null;
    }

    return parsedUser;
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
          // ✅ BLOCK SUSPENDED DOCTORS
          if (
            doctor?.account_status === "suspended" ||
            doctor?.account_status === "deleted"
          ) {
            await supabase.auth.signOut();

            localStorage.removeItem(STORAGE_KEY);

            setUser(null);

            return;
          }

          const topbarInfo = await fetchDoctorsTopbarInfo(doctor.doctors_id);

          setUser({
            ...doctor,
            role: "doctor",
            avatar: topbarInfo?.avatarUrl || null,
          });

          return;
        }
      } catch (err) {
        console.log("Not a doctor:", err.message);
      }

      try {
        const patient = await getPatientByUserId(authUser.id);
        if (patient) {
          setUser({
            ...patient,
            role: "patient",
            avatar: patient.profile_picture || null, // ✅
          });
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

  const logout = async () => {
    await supabase.auth.signOut(); // ✅ real Supabase logout
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
