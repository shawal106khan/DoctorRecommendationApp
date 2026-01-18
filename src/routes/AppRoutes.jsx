import { Routes, Route } from "react-router-dom";
import { authRoutes } from "./AuthRoutes";
import { patientRoutes } from "./PatientRoutes";

function AppRoutes() {
  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {patientRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
