import { formatTime } from "./formatTime";

export const generateTimeSlots = (
  startTime,
  endTime,
  slotDuration,
  bookedSlots = [],
) => {
  const slots = [];

  const today = new Date();

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date(today);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date(today);
  end.setHours(endHour, endMinute, 0, 0);

  while (start < end) {
    const slotStart = new Date(start);

    start.setMinutes(start.getMinutes() + slotDuration);

    const slotEnd = new Date(start);

    if (slotEnd <= end) {
      const rawStart = slotStart.toTimeString().slice(0, 5);
      const rawEnd = slotEnd.toTimeString().slice(0, 5);

      // skip booked slots
      if (!bookedSlots.includes(rawStart)) {
        slots.push({
          start: formatTime(rawStart),
          end: formatTime(rawEnd),
          rawStart,
          rawEnd,
        });
      }
    }
  }

  return slots;
};
