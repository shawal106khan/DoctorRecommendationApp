import { X, LogOut } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarMenu } from "../../../config/sidebarMenu";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ role, isOpen, onClose }) => {
  const location = useLocation();
  const menus = sidebarMenu[role] || [];
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 md:z-auto md:w-60
        bg-blue-700 min-h-screen flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={onClose} className="text-white">
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-medium"
                      : "text-white hover:bg-blue-600/70"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4 border-t border-blue-600">
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="w-full flex items-center gap-3 px-4 py-2
            text-sm text-red-500 hover:bg-red-50 rounded-md transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
