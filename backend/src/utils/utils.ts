import Shift from "../models/shift";

type shiftTime = {
  startTime: string;
  endTime: string;
};

export type shiftsType = shiftTime[];

export async function findShift(currentDate: Date) {
  // Convert the current time into total minutes (since midnight).
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
  const shifts = await Shift.find();

  const shift = shifts?.find(({ startTime, endTime }) => {
    const startHours = parseInt(startTime.split(":")[0]);
    const startMins = parseInt(startTime.split(":")[1]);
    const endHours = parseInt(endTime.split(":")[0]);
    const endMins = parseInt(endTime.split(":")[1]);

    const startMinutes = startHours * 60 + startMins;
    let endMinutes = endHours * 60 + endMins;

    // Handle last shift (20:00 - 00:00 should cover until 23:59)
    if (endTime === "00:00") endMinutes = 24 * 60; // Set to 1440 minutes (end of day)

    return currentTime >= startMinutes && currentTime < endMinutes;
  });

  return shift;
}
