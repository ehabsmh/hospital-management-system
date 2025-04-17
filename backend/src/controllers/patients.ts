import { NextFunction, Request, Response } from "express";
import {
  AppError,
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import Patient from "../models/patient";

class PatientController {
  static async newPatient(req: Request, res: Response, next: NextFunction) {
    const { fullName, phoneNumber, age, job, additionalInfo } = req.body;

    try {
      if (!fullName || !phoneNumber || !age || !job) {
        throw new AppError(
          "Full name, phone number, age, and job are required fields",
          "RequireError",
          400
        );
      }

      // Check if the patient already exists
      const patientExists = await Patient.findOne({
        $or: [{ fullName }, { phoneNumber }],
      });

      if (patientExists)
        throw new AppError("Patient already exists", "DuplicationError", 409);

      // Create a new patient
      const newPatient = await Patient.create({
        fullName,
        phoneNumber,
        age,
        job,
        additionalInfo,
      });
      res.status(201).json(newPatient);
    } catch (err) {
      next(err);
    }
  }

  static async getPatient(req: Request, res: Response, next: NextFunction) {
    const phoneNumber = req.query["phone-number"];

    try {
      if (!phoneNumber)
        throw new AppError("Phone number is required", "RequireError", 400);
      const patient = await Patient.findOne({ phoneNumber });
      if (!patient)
        throw new AppError("Patient not found", "NotFoundError", 404);
      res.status(200).json(patient);
    } catch (err) {
      next(err);
    }
  }

  static async editPatient(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { fullName, age, job, additionalInfo } = req.body;
    try {
      const patient = await Patient.findById(id);
      if (!patient)
        throw new AppError("Patient not found", "NotFoundError", 404);

      await patient.updateOne({ fullName, age, job, additionalInfo });
      res.status(200).json({ message: "Patient updated successfully" });
    } catch (err) {
      next(err);
    }
  }
}
export default PatientController;
