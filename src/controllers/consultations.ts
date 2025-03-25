import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import { RequireError } from "../utils/errorHandlers";
import Consultation from "../models/consultation";

class ConsultationController {
  static async newConsultation(req: CustomRequest, res: Response) {
    const { _id: doctorId } = req.user!;
    const { patientId, dueDate, alertOn } = req.body;
    try {
      if (!patientId || !dueDate) {
        throw new RequireError("Missing patientId or dueDate in request body");
      }

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
}

export default ConsultationController;
