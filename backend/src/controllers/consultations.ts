import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { AppError, NotFoundError, RequireError } from "../utils/errorHandlers";
import Consultation from "../models/consultation";

class ConsultationController {
  static async newConsultation(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const { _id: doctorId } = req.user!;
    const { patientId, dueDate, alertOn } = req.body;
    try {
      if (!patientId || !dueDate) {
        throw new AppError(
          "Missing patientId or dueDate in request body",
          "RequireError",
          400
        );
      }

      await Consultation.findOneAndDelete({
        doctorId,
        patientId,
      });

      const newConsultation = await Consultation.create({
        doctorId,
        patientId,
        dueDate,
        alertOn,
      });

      res.status(201).json(newConsultation);
    } catch (err) {
      next(err);
    }
  }

  static async getConsultation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const patientId = req.query["patient-id"];
      const doctorId = req.query["doctor-id"];

      if (!patientId || !doctorId) {
        throw new AppError(
          "Missing patientId or doctorId in request query",
          "RequireError",
          400
        );
      }

      const now = new Date();
      const consultationExists = await Consultation.findOne({
        patientId,
        doctorId,
      });

      if (!consultationExists) {
        throw new AppError("Consultation not found", "NotFoundError", 404);
      }
      const isExists = consultationExists.dueDate >= now;

      if (!isExists) {
        throw new AppError("Consultation is expired", "NotFoundError", 404);
      }

      res.status(200).json({ data: isExists, message: "Consultation found" });
    } catch (err) {
      next(err);
    }
  }
}

export default ConsultationController;
