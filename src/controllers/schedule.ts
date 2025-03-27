import { Request, Response } from "express";
import WorkSchedule from "../models/schedule";
import DoctorSchedule from "../models/doctorsShifts";
import { NotFoundError } from "../utils/errorHandlers";
import { findShift } from "../utils/utils";
import DoctorsShifts from "../models/doctorsShifts";

class ScheduleController {
  static async getCurrentShift(req: Request, res: Response) {
    const shiftId = req.query["shift-id"];
    const now = new Date();

    // get current day
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });

    console.log(currentDay);

    try {
      // get shifts based on the current day
      const workSchedule = await WorkSchedule.findOne(
        {
          availableDays: currentDay,
        },
        { _id: 1 }
      );

      //// get shift index within the current time
      // const shifts = workSchedule?.shifts;
      const shift = await findShift(now);

      console.log(shift, workSchedule?._id);

      // get doctors for the current shift
      const doctorSchedule = await DoctorsShifts.find({
        groupId: workSchedule?._id,
        shiftId: shift?._id,
      }).populate("doctors");

      if (!doctorSchedule.length) {
        throw new NotFoundError("No doctor found for current shift.");
      }

      res.json({ data: doctorSchedule });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      console.log(err);
      res.status(500).json({ error: "Internal server error." });
    }
  }

  static async setExtraDay(req: Request, res: Response) {
    try {
      // get work schedules
      const workSchedule = await WorkSchedule.find();

      // find the group that has extra day is set to true
      const extraDayGroup = workSchedule.find((schedule) => schedule.extraDay);
      const otherGroup = workSchedule.find((schedule) => !schedule.extraDay);

      // set it to false and remove the extra day (friday) from available days
      extraDayGroup!.extraDay = false;

      // set the other group to true
      otherGroup!.extraDay = true;

      // save the changes
      if (extraDayGroup && otherGroup) {
        await WorkSchedule.bulkSave([extraDayGroup, otherGroup]);
        res.json({ message: "Extra day set successfully." });
      } else {
        throw new NotFoundError("Groups not found or extra day group not set.");
      }
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }

      res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default ScheduleController;
