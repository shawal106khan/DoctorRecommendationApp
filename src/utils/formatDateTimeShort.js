export const formatDateTimeShort = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
