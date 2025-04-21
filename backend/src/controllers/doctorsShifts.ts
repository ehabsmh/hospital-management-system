import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { IUser } from "../interfaces/User";
import {
  AppError,
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import DoctorsShifts from "../models/doctorsShifts";
import WorkSchedule from "../models/schedule";
import { findShift } from "../utils/utils";
import Clinic from "../models/clinic";
import Shift from "../models/shift";

class DoctorsShiftsController {
  static async getDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: shiftId } = req.params;
      const clinicId = req.query["clinic-id"];
      const groupId = req.query["group-id"];

      if (!shiftId) {
        throw new AppError("Shift id param is required.", "RequireError", 400);
      }
      if (!groupId && !clinicId) {
        throw new AppError(
          "group id and clinic id query params are required.",
          "RequireError",
          400
        );
      }

      const doctorsShifts = await DoctorsShifts.findOne({
        shiftId,
        groupId,
      }).populate("doctors");

      if (!doctorsShifts) {
        throw new AppError(
          "No doctors found for the shift",
          "NotFoundError",
          404
        );
      }

      const doctors = <IUser[]>doctorsShifts.doctors;

      const doctor = doctors.find(
        (doctor) => doctor.doctorInfo?.clinicId?.toString() === clinicId
      );

      if (!doctor) {
        throw new AppError(
          "Doctor not found for this clinic.",
          "NotFoundError",
          404
        );
      }

      res.json(doctor);
    } catch (err) {
      next(err);
    }
  }

  static async addDoctorToShift(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { doctorId, groupId, shiftId } = req.body;

      if (!doctorId || !groupId || !shiftId) {
        throw new AppError(
          "Doctor id, group id and shift id are required.",
          "RequireError",
          400
        );
      }

      const doctor = await User.findById(doctorId);

      if (!doctor) {
        throw new AppError("Doctor not found.", "NotFoundError", 404);
      }

      const isDoctorAlreadyAssigned = await DoctorsShifts.findOne({
        groupId,
        shiftId,
        doctors: { $in: [doctorId] },
      });

      if (isDoctorAlreadyAssigned || doctor.doctorInfo?.shiftId) {
        throw new AppError(
          "Doctor is already assigned to a shift.",
          "DuplicationError",
          409
        );
      }

      let doctorsShift = await DoctorsShifts.findOne({
        shiftId,
        groupId,
      }).populate("doctors");

      if (!doctorsShift) {
        doctorsShift = await DoctorsShifts.create({
          doctors: [doctorId],
          groupId,
          shiftId,
        });
      } else {
        const doctorSpecialty = doctor.doctorInfo?.clinicId;

        // Check if a doctor of the same specialty is already assigned to this shift
        const doctors = <IUser[]>doctorsShift.doctors;
        const isSameSpecialty = doctors.some(
          (doctor) =>
            doctor.doctorInfo?.clinicId.toString() ===
            doctorSpecialty?.toString()
        );

        if (isSameSpecialty) {
          throw new AppError(
            "A doctor of the same specialty is already assigned to this shift.",
            "DuplicationError",
            409
          );
        }

        doctorsShift?.doctors.push(doctorId);
      }

      if (doctor.doctorInfo) {
        doctor.doctorInfo.shiftId = doctorsShift._id;
        await doctor.save();
        await doctorsShift?.save();
      }

      res.status(201).json(doctorsShift);
    } catch (err) {
      next(err);
    }
  }

  static async deleteDoctorFromShift(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { shiftId } = req.params;
      const { doctorId, groupId } = req.body;

      if (!doctorId || !groupId || !shiftId) {
        throw new AppError(
          "Doctor id, group id and shift id are required.",
          "RequireError",
          400
        );
      }

      const doctorShift = await DoctorsShifts.findOneAndUpdate(
        { shiftId, groupId },
        { $pull: { doctors: doctorId } }
      );

      if (!doctorShift) {
        throw new AppError("Doctor shift not found.", "NotFoundError", 404);
      }

      const doctor = await User.findByIdAndUpdate(doctorId, {
        "doctorInfo.shiftId": null,
      });

      res.json({
        message: `Dr. ${doctor?.fullName.split(" ")[0]} ${doctor?.fullName
          .split(" ")
          .at(-1)} removed from shift.`,
        doctorShift,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentShift(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const now = new Date();
    const egyptTimeStr = now.toLocaleString("en-EG", {
      timeZone: "Africa/Cairo",
    });
    const egyptTimeDate = new Date(egyptTimeStr);

    // get current day
    const currentDay = now.toLocaleString("en-us", { weekday: "long" });

    try {
      // get shifts based on the current day
      const workSchedule = await WorkSchedule.findOne(
        {
          availableDays: currentDay,
        },
        { _id: 1 }
      );

      const shift = await findShift(egyptTimeDate);

      // get doctors for the current shift
      const doctorSchedule = await DoctorsShifts.findOne({
        groupId: workSchedule?._id,
        shiftId: shift?._id,
      }).populate({
        path: "doctors",
        select: "fullName avatar doctorInfo",
        populate: {
          path: "doctorInfo.clinicId",
          model: Clinic,
          select: "name",
        },
      });

      if (!doctorSchedule || !doctorSchedule.doctors.length) {
        throw new AppError(
          "No doctors found for current shift.",
          "NotFoundError",
          404
        );
      }

      res.json(doctorSchedule);
    } catch (err) {
      next(err);
    }
  }

  static async getAllShifts(req: Request, res: Response) {
    try {
      const shifts = await Shift.find();
      res.json(shifts);
    } catch (err) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default DoctorsShiftsController;
