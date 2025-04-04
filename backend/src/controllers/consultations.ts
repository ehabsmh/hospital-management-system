import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { NotFoundError, RequireError } from "../utils/errorHandlers";
import Consultation from "../models/consultation";

class ConsultationController {
  static async newConsultation(req: CustomRequest, res: Response) {
    const { _id: doctorId } = req.user!;
    const { patientId, dueDate, alertOn } = req.body;
    try {
      if (!patientId || !dueDate) {
        throw new RequireError("Missing patientId or dueDate in request body");
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

      res.status(201).json({ data: newConsultation });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: { message: err.message } });

        return;
      }

      res.status(500).json({ error: { message: "internal server error" } });
    }
  }

  static async getConsultation(req: Request, res: Response) {
    try {
      const patientId = req.query["patient-id"];
      const doctorId = req.query["doctor-id"];

      if (!patientId || !doctorId) {
        throw new RequireError(
          "Missing patientId or doctorId in request query"
        );
      }

      const now = new Date();
      const isExists = await Consultation.findOne({
        patientId,
        doctorId,
        dueDate: { $gte: now },
      });

      if (!isExists) {
        throw new NotFoundError("Consultation is expired");
      }

      res.status(200).json({ data: isExists, message: "Consultation found" });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: { message: err.message } });

        return;
      }

      if (err instanceof NotFoundError) {
        res.status(err.statusCode).json({ error: { message: err.message } });

        return;
      }

      res.status(500).json({ error: { message: "internal server error" } });
    }
  }
}

export default ConsultationController;
