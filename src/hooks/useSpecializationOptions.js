import { useEffect, useMemo, useState } from "react";
import { fetchSpecializations } from "../services/doctorService";

const useSpecializationOptions = () => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSpecializations();
        setSpecializations(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const options = useMemo(
    () =>
      specializations.map((s) => ({
        label: s.name,
        value: s.specialization_id,
      })),
    [specializations],
  );

  return { options };
};

export default useSpecializationOptions;
