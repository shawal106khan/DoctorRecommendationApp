import { useEffect, useMemo, useState } from "react";
import { fetchDiseases } from "../services/diseaseService";
import { useLoading } from "./useLoading";

const useDiseaseOptions = () => {
  const { loading, stopLoading } = useLoading();
  const [diseases, setDiseases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await fetchDiseases();
        if (active) setDiseases(data);
      } catch (err) {
        console.log(err);

        if (active) setError(err);
      } finally {
        if (active) stopLoading();
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [stopLoading]);

  const options = useMemo(
    () =>
      (diseases || []).map((d) => ({
        label: d.disease_name,
        value: d.diseases_id,
      })),
    [diseases],
  );

  return { options, loading, error };
};

export default useDiseaseOptions;
