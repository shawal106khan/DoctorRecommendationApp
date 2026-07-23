import { useState } from "react";

export const useDoctorSearch = (onSearch, onSpecializationSearch) => {
  const [disease, setDisease] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleSearch = () => {
    if (disease) {
      onSearch(disease);
      return;
    }

    if (specialization) {
      onSpecializationSearch(specialization);
    }
  };

  return {
    disease,
    setDisease,
    specialization,
    setSpecialization,
    handleSearch,
  };
};
