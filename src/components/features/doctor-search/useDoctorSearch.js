import { useState } from "react";

export const useDoctorSearch = (onSearch) => {
  const [disease, setDisease] = useState("");

  const handleSearch = () => {
    if (!disease) return;
    onSearch(disease);
  };

  return {
    disease,
    setDisease,
    handleSearch,
  };
};
