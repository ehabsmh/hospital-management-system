import { Request, Response } from "express";
import User from "../models/user";
import { IUser } from "../interfaces/User";
import {
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import DoctorsShifts from "../models/doctorsShifts";

class DoctorsShiftsController {
  static async getDoctorsByShiftId(req: Request, res: Response) {
    try {
      const shiftId = req.query["shift-id"];
      const clinicId = req.query["clinic-id"];

      if (!shiftId) {
        throw new RequireError("Shift id and clinic id are required.");
      }

      const doctorsShifts = await DoctorsShifts.findOne({ shiftId }).populate(
        "doctors"
      );

      if (!doctorsShifts) {
        throw new NotFoundError("No doctors found for the shift");
      }

      const doctors = <IUser[]>doctorsShifts.doctors;
      console.log(doctors);
      const doctor = doctors.find(
        (doctor) => doctor.doctorInfo?.clinicId.toString() === clinicId
      );

      console.log(doctor);

      res.json({ data: doctor });
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
        throw new RequireError("Doctor id, group id and shift id is required.");
      }

      const doctor = await User.findById(doctorId);
      if (!doctor) {
        throw new NotFoundError("Doctor not found.");
      }

      const isDoctorAlreadyAssigned = await DoctorsShifts.findOne({
        doctors: { $in: [doctorId] },
      });

      if (isDoctorAlreadyAssigned) {
        throw new DuplicationError("Doctor is already assigned to a shift.");
      }

      let doctorsShift = await DoctorsShifts.findOne({
        shiftId,
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
          (doctor) => doctor.doctorInfo?.clinicId === doctorSpecialty
        );

        if (isSameSpecialty)
          throw new DuplicationError(
            "A doctor of the same specialty is already assigned to this shift."
          );
        //     }

        doctorsShift?.doctors.push(doctorId);
        if (doctor.doctorInfo?.shiftId) {
          doctor.doctorInfo.shiftId = doctorsShift._id;
          await doctor.save();
          await doctorsShift?.save();
        }
      }

      res.status(201).json({ data: doctorsShift });
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
}

export default DoctorsShiftsController;
