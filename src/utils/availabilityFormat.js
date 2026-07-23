import { numberToDay } from "./dayMap";
import { formatTime } from "./formatTime";
export const formatAvailability = (availability) => {
  if (!availability?.length) {
    return { days: "—", time: "—", slot: "—" };
  }

  const days = availability.map((a) => numberToDay[a.day_of_week]).join(", ");
  const time = `${formatTime(availability[0].start_time)} - ${formatTime(
    availability[0].end_time,
  )}`;
  const slot = `${availability[0].slot_duration_minutes} mins`;

  return { days, time, slot };
};
