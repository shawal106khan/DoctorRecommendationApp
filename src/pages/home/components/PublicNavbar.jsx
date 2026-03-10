import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
const PublicNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 py-2 lg:px-10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 ">
          <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            <img src={logo} alt="logo" />
          </div>
        </div>

        {/* Menu */}
        <nav className="flex  items-center gap-4 md:gap-8 text-base font-medium font-serif text-black">
          <a
            href="#home"
            className={`transition ${
              isHome
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </a>

          <a
            href="#about"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            About
          </a>

          <a
            href="#services"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Services
          </a>

          <a
            href="#contact"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Contact
          </a>
        </nav>

        {/* Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-800 text-white px-7 py-3 rounded-lg text-sm font-serif transition shadow-lg shadow-slate-400"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default PublicNavbar;
