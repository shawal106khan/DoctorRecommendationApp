// src/components/common/Header.jsx
import { useLocation } from "react-router-dom";

function Header({ user }) {
  const location = useLocation();
  let title = "Doctor Recommendation App";

  if (location.pathname === "/login") title += " – Login";
  else if (location.pathname === "/signup") title += " – Sign Up";
  else if (user) title = `Welcome, ${user.name}`;

  return (
    <header className="text-center py-4 text-2xl font-bold bg-white shadow">
      {title}
    </header>
  );
}
export default Header;
