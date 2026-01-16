import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "./AuthContext";

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }) => {
  // ✅ initialize from localStorage (refresh-safe)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

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
  const value = useMemo(() => ({ user, setUser, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
