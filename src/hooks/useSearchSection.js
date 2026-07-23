import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const useSearchSection = (triggerSearchSection) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const section = searchParams.get("section");

    if (section === "search") {
      setTimeout(() => {
        triggerSearchSection();
        navigate("/patient/dashboard", { replace: true });
      });
    }
  }, [searchParams, triggerSearchSection, navigate]);
};
