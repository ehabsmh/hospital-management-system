import { Request, Response } from "express";
import DoctorSchedule from "../models/doctorSchedule";
import User from "../models/user";
import { IUser } from "../interfaces/User";
import { DuplicationError, NotFoundError } from "../utils/errorHandlers";

class DoctorScheduleController {
  static async assignSchedule(req: Request, res: Response) {
    const { doctorId, belongsToGroup, shiftIndex } = req.body;

    if (!doctorId || !belongsToGroup || shiftIndex === undefined) {
      res
        .status(400)
        .json({ message: "Missing doctor id, belongsToGroup or shiftIndex." });
      return;
    }

    try {
      // Check if the doctor already in a schedule
      const isScheduled = await DoctorSchedule.findOne({
        doctor: doctorId,
      });
      if (isScheduled) {
        res.status(400).json({
          message: `Doctor is already in the schedule.\n${isScheduled.belongsToGroup}.\nShiftIndex: ${isScheduled.shiftIndex}.`,
        });
        return;
      }

      // Check if a doctor of the same specialty is already assigned to this shift
      if (!isScheduled) {
        // Find the doctor
        const doctor = await User.findById(doctorId);

        // Get the specialty of the doctor
        if (!doctor) throw new NotFoundError("Doctor not found.");

        const doctorSpecialty = doctor.doctorInfo?.specialty;

        // Get all doctors assigned to this shift in the same group
        const doctorsSchedule = await DoctorSchedule.find({
          belongsToGroup,
          shiftIndex,
        }).populate("doctor");

        // Check if a doctor of the same specialty is already assigned to this shift
        const isSameSpecialty = doctorsSchedule.some(
          (doctorSchedule) =>
            (doctorSchedule.doctor as IUser).doctorInfo?.specialty ===
            doctorSpecialty
        );

        if (isSameSpecialty)
          throw new DuplicationError(
            "A doctor of the same specialty is already assigned to this shift."
          );
      }

      const doctorSchedule = await DoctorSchedule.create({
        doctor: doctorId,
        belongsToGroup,
        shiftIndex,
      });
      res.status(201).json({
        message: "Doctor schedule assigned successfully.",
        data: doctorSchedule,
      });
    } catch (err) {
      if (err instanceof DuplicationError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      res.status(500).json({
        error: { message: "Something went wrong with the server." },
      });
    }
  }
}

export default DoctorScheduleController;
