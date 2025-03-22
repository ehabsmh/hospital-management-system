import { Request, Response } from "express";
import WorkSchedule from "../models/schedule";
import DoctorSchedule from "../models/doctorSchedule";
import { NotFoundError } from "../utils/errorHandlers";
import { findShiftIndex, shiftsType } from "../utils/utils";

class ScheduleController {
  static async getCurrentShift(req: Request, res: Response) {
    const now = new Date();

    // get current day
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });

    // get shifts based on the current day
    const workSchedule = await WorkSchedule.findOne(
      {
        availableDays: currentDay,
      },
      { shifts: 1, _id: 0, groupName: 1 }
    );

    // get shift index within the current time
    const shifts = workSchedule?.shifts;
    const shiftIndex = findShiftIndex(shifts as shiftsType, now);

    // get doctors for the current shift
    const doctorSchedule = await DoctorSchedule.find({
      belongsToGroup: workSchedule?.groupName,
      shiftIndex,
    }).populate("doctor");

    if (!doctorSchedule) {
      throw new NotFoundError("No doctor found for current shift.");
    }

    res.json({ data: doctorSchedule });
  }
}

export default ScheduleController;
