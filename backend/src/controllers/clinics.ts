import { NextFunction, Request, Response } from "express";
import Clinic from "../models/clinic";
import {
  AppError,
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";

class ClinicController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, floor, roomNumber } = req.body;

    if (!name || !floor || !roomNumber) {
      throw new AppError("Please provide all fields.", "RequireError", 400);
    }

    try {
      const isClinicFound = await Clinic.findOne({ name });
      if (isClinicFound) {
        throw new AppError("Clinic already exists.", "DuplicationError", 409);
      }

      const roomNumIsExists = await Clinic.findOne({ roomNumber });

      if (roomNumIsExists) {
        throw new AppError(
          "Room number already exists.",
          "DuplicationError",
          409
        );
      }

      // Create clinic
      await Clinic.create({ name, floor, roomNumber });
      res.status(201).json({ message: "Clinic created successfully." });
    } catch (err) {
      next(err);
    }
  }

  static async edit(req: Request, res: Response, next: NextFunction) {
    const { name, floor, roomNumber } = req.body;
    const { id } = req.params;

    try {
      // Check if the clinic changed effectively
      const clinicChanged = await Clinic.findOne({ _id: id, ...req.body });

      if (clinicChanged) {
        res.status(400).json({ error: { message: "No changes were made." } });

        return;
      }

      const roomNumIsExists = await Clinic.findOne({ roomNumber });

      if (roomNumIsExists) {
        throw new AppError(
          "Room number already exists.",
          "DuplicationError",
          409
        );
      }

      const clinic = await Clinic.findByIdAndUpdate(
        id,
        { name, floor, roomNumber },
        { new: true }
      );

      if (!clinic)
        throw new AppError("Clinic not found.", "NotFoundError", 404);

      res.json({ data: clinic, message: "Clinic updated successfully." });
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const clinics = await Clinic.find().select("-__v");

      if (!clinics)
        throw new AppError("Clinics not found.", "NotFoundError", 404);

      res.json(clinics);
    } catch (err) {
      next(err);
    }
  }
}
export default ClinicController;
