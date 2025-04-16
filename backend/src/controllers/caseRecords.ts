import { NextFunction, Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import CaseRecord from "../models/CaseRecord";
import { AppError } from "../utils/errorHandlers";

class CaseRecordsController {
  static async addCaseRecord(req: CustomRequest, res: Response) {
    try {
      const doctorId = req.user?._id;
      const { patientId, report, prescription } = req.body;

      const newCase = await CaseRecord.create({
        doctorId,
        patientId,
        report,
        prescription,
      });

      res.status(201).json({
        message: "Case added successfully",
        case: newCase,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteCaseRecord(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const doctorId = req.user?._id;
      const { caseId } = req.params;

      const deletedCase = await CaseRecord.findOneAndDelete({
        _id: caseId,
        doctorId,
      });

      if (!deletedCase) {
        throw new AppError(
          "Case not found or you do not have permission to delete it",
          "NotfoundError",
          404
        );
      }

      res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getDoctorCaseRecords(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const doctorId = req.user?._id;
    try {
      const cases = await CaseRecord.find({
        doctorId,
        patientId: req.query["patient-id"],
      })
        .populate("report")
        .populate("prescription");

      if (!cases) throw new AppError("No cases found", "NotFoundError", 404);

      res.status(200).json(cases);
    } catch (error) {
      next(error);
    }
  }
}

export default CaseRecordsController;
