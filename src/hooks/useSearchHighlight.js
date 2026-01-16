// src/hooks/useSearchHighlight.js
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchHighlight = () => {
  const [highlight, setHighlight] = useState(false);
  const [searchParams] = useSearchParams();
  const openSearch = searchParams.get("search") === "true";
  const ref = useRef(null);

  useEffect(() => {
    if (!openSearch || !ref.current) return;

    ref.current.scrollIntoView({ behavior: "smooth" });

    const highlightTimer = setTimeout(() => setHighlight(true), 0);
    const resetTimer = setTimeout(() => setHighlight(false), 1200);

    return () => {
      clearTimeout(highlightTimer);
      clearTimeout(resetTimer);
    };
  }, [openSearch]);

  return { ref, highlight };
};
