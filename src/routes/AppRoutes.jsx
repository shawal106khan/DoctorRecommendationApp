import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./AuthRoutes";
import { patientRoutes } from "./PatientRoutes";
import { doctorRoutes } from "./DoctorRoutes";
import AdminRoutes from "./AdminRoutes";
function AppRoutes() {
  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {patientRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {doctorRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {AdminRoutes().map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
