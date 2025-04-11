import { Request, Response } from "express";
import Report from "../models/Report";
import { CustomRequest } from "../middlewares/auth";

class ReportsController {
  static async createReport(req: CustomRequest, res: Response) {
    try {
      const doctor = req.user;

      const { title, body, patientId } = req.body;
      const report = await Report.create({
        title,
        body,
        doctorId: doctor?._id,
        patientId,
      });

      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getReportsByPatientId(req: CustomRequest, res: Response) {
    try {
      const user = req.user;
      const patientId = req.query["patient-id"];
      const reports = await Report.find({ patientId, doctorId: user?._id });
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ReportsController;
