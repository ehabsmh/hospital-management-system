import { Request, Response } from "express";
import Clinic from "../models/clinic";
import {
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";

class ClinicController {
  static async create(req: Request, res: Response) {
    const { name, floor, roomNumber } = req.body;

    if (!name || !floor || !roomNumber) {
      throw new RequireError("Please provide all fields.");
    }

    try {
      const isClinicFound = await Clinic.findOne({ name });
      if (isClinicFound) {
        throw new DuplicationError("Clinic already exists.");
      }

      // Create clinic
      const clinic = await Clinic.create({ name, floor, roomNumber });
      res
        .status(201)
        .json({ data: clinic, message: "Clinic created successfully." });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).send(err.message);

        return;
      }

      if (err instanceof DuplicationError) {
        res.status(err.statusCode).json({
          error: { message: err.message },
        });

        return;
      }

      if (err instanceof Error) {
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }

  static async edit(req: Request, res: Response) {
    const { name, floor, roomNumber } = req.body;
    const { id } = req.params;

    try {
      // Check if the clinic changed effectively
      const clinicChanged = await Clinic.findOne({ _id: id, ...req.body });

      if (clinicChanged) {
        res.status(400).json({ error: { message: "Nothing changed." } });

        return;
      }

      const clinic = await Clinic.findByIdAndUpdate(
        id,
        { name, floor, roomNumber },
        { new: true }
      );

      if (!clinic) throw new NotFoundError("Clinic not found.");

      res.json({ data: clinic, message: "Clinic updated successfully." });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof Error) {
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }
}
export default ClinicController;
