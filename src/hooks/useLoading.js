import { useState, useCallback } from "react";

export const useLoading = (initial = false) => {
  const [loading, setLoading] = useState(initial);

  const startLoading = useCallback(() => setLoading(true), []);
  const stopLoading = useCallback(() => setLoading(false), []);
  const toggleLoading = useCallback(() => setLoading((v) => !v), []);

  return { loading, setLoading, startLoading, stopLoading, toggleLoading };
};
