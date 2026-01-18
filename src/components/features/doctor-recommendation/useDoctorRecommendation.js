import { useMemo } from "react";

export const useDoctorRecommendation = (doctors, selectedDisease) => {
  const recommendedDoctors = useMemo(() => {
    if (!selectedDisease) return doctors;
    return doctors.filter((doctor) => doctor.disease === selectedDisease);
  }, [doctors, selectedDisease]);

  return { recommendedDoctors };
};
