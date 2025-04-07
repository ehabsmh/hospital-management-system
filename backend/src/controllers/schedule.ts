import { Request, Response } from "express";
import WorkSchedule from "../models/schedule";
import { NotFoundError } from "../utils/errorHandlers";

class ScheduleController {
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

  static async getGroups(req: Request, res: Response) {
    try {
      const workSchedules = await WorkSchedule.find();
      res.json(workSchedules);
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default ScheduleController;
