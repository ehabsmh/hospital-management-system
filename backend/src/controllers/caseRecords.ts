import { Response } from "express";
import { CustomRequest } from "../middlewares/auth";
import CaseRecord from "../models/CaseRecord";
import { NotFoundError } from "../utils/errorHandlers";

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
      console.error("Error adding case:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteCaseRecord(req: CustomRequest, res: Response) {
    try {
      const doctorId = req.user?._id;
      const { caseId } = req.params;
      const deletedCase = await CaseRecord.findOneAndDelete({
        _id: caseId,
        doctorId,
      });

      if (!deletedCase) {
        throw new NotFoundError(
          "Case not found or you do not have permission to delete it"
        );
      }

      res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
      console.error("Error deleting case:", error);

      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getDoctorCaseRecords(req: CustomRequest, res: Response) {
    const doctorId = req.user?._id;
    try {
      const cases = await CaseRecord.find({
        doctorId,
        patientId: req.query["patient-id"],
      })
        .populate("report")
        .populate("prescription");

      if (!cases) throw new NotFoundError("No cases found");

      res.status(200).json(cases);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default CaseRecordsController;
