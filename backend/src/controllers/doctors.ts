import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import { AppError } from "../utils/errorHandlers";

class DoctorsController {
  static async getDoctorsByClinic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const clinicId = req.query["clinic-id"];

      if (!clinicId) {
        throw new AppError("Clinic id is required.", "RequireError", 400);
      }

      // find doctors who have no shift by clinic id (for new doctors)
      const doctors = await User.find({
        role: "doctor",
        "doctorInfo.clinicId": clinicId,
        "doctorInfo.shiftId": null,
      });

      res.json(doctors);
    } catch (err) {
      next(err);
    }
  }
}

export default DoctorsController;
