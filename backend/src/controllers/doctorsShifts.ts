import { Request, Response } from "express";
import User from "../models/user";
import { IUser } from "../interfaces/User";
import {
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
  static async getDoctor(req: Request, res: Response) {
    try {
      const { id: shiftId } = req.params;
      const clinicId = req.query["clinic-id"];
      const groupId = req.query["group-id"];

      if (!shiftId) {
        throw new RequireError("Shift id param is required.");
      }
      if (!groupId && !clinicId) {
        throw new RequireError(
          "group id and clinic id query params are required."
        );
      }

      const doctorsShifts = await DoctorsShifts.findOne({
        shiftId,
        groupId,
      }).populate("doctors");

      if (!doctorsShifts) {
        throw new NotFoundError("No doctors found for the shift");
      }

      const doctors = <IUser[]>doctorsShifts.doctors;

      const doctor = doctors.find(
        (doctor) => doctor.doctorInfo?.clinicId?.toString() === clinicId
      );

      if (!doctor) {
        throw new NotFoundError("Doctor not found for this clinic.");
      }

      res.json(doctor);
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }

      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }

      res.status(500).json({ error: "Internal server error." });
    }
  }

  static async addDoctorToShift(req: Request, res: Response) {
    try {
      const { doctorId, groupId, shiftId } = req.body;

      if (!doctorId || !groupId || !shiftId) {
        throw new RequireError(
          "Doctor id, group id and shift id are required."
        );
      }

      const doctor = await User.findById(doctorId);

      if (!doctor) {
        throw new NotFoundError("Doctor not found.");
      }

      const isDoctorAlreadyAssigned = await DoctorsShifts.findOne({
        groupId,
        shiftId,
        doctors: { $in: [doctorId] },
      });

      if (isDoctorAlreadyAssigned || doctor.doctorInfo?.shiftId) {
        throw new DuplicationError("Doctor is already assigned to a shift.");
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
          throw new DuplicationError(
            "A doctor of the same specialty is already assigned to this shift."
          );
        }

        doctorsShift?.doctors.push(doctorId);
      }

      if (doctor.doctorInfo) {
        doctor.doctorInfo.shiftId = doctorsShift._id;
        await doctor.save();
        await doctorsShift?.save();
        console.log(doctor.doctorInfo);
      }

      res.status(201).json(doctorsShift);
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }

      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }

      if (err instanceof DuplicationError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: "Internal server error." });
    }
  }

  static async getCurrentShift(req: Request, res: Response) {
    const now = new Date();

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

      const shift = await findShift(now);

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

      if (!doctorSchedule) {
        throw new NotFoundError("No doctors found for current shift.");
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
