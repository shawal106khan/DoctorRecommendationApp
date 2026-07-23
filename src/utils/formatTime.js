export const formatTime = (time) => {
  if (!time || !time.includes(":")) return time || "Pending";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formatted = hour % 12 || 12;
  return `${formatted}:${m} ${suffix}`;
};
