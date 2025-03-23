import { Request, Response } from "express";
import {
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import Patient from "../models/patient";

class PatientController {
  static async newPatient(req: Request, res: Response) {
    const { fullName, phoneNumber, age, job, additionalInfo } = req.body;

    try {
      if (!fullName || !phoneNumber || !age || !job) {
        throw new RequireError(
          "Full name, phone number, age, and job are required fields"
        );
      }

      // Check if the patient already exists
      const patientExists = await Patient.findOne({
        $or: [{ fullName }, { phoneNumber }],
      });

      if (patientExists) throw new DuplicationError("Patient already exists");

      // Create a new patient
      const newPatient = await Patient.create({
        fullName,
        phoneNumber,
        age,
        job,
        additionalInfo,
      });
      res.status(201).json({ data: newPatient });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({
          error: {
            message: err.message,
          },
        });
        return;
      }
      if (err instanceof DuplicationError) {
        res.status(err.statusCode).json({
          error: {
            message: err.message,
          },
        });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  }

  static async getPatient(req: Request, res: Response) {
    const phoneNumber = req.query["phone-number"];

    if (!phoneNumber) throw new RequireError("Phone number is required");

    try {
      const patient = await Patient.findOne({ phoneNumber });
      if (!patient) throw new NotFoundError("Patient not found");
      res.status(200).json({ data: patient });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({
          error: {
            message: err.message,
          },
        });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  }

  static async editPatient(req: Request, res: Response) {
    const { id } = req.params;
    const { fullName, age, job, additionalInfo } = req.body;

    try {
      const patient = await Patient.findById(id);
      if (!patient) throw new NotFoundError("Patient not found");

      await patient.updateOne({ fullName, age, job, additionalInfo });
      res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({
          error: {
            message: err.message,
          },
        });
        return;
      }
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  }
}
export default PatientController;
