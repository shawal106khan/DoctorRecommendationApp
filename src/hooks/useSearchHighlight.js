import { useRef, useState } from "react";

export const useSearchHighlight = (duration = 1200) => {
  const ref = useRef(null);
  const [highlight, setHighlight] = useState(false);

  const trigger = () => {
    if (!ref.current) return;

    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setHighlight(true);
    setTimeout(() => setHighlight(false), duration);
  };

  return { ref, highlight, trigger };
};
