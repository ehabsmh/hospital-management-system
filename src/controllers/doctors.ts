import { Request, Response } from "express";
import User from "../models/user";

class DoctorsController {
  static async getDoctorsByClinic(req: Request, res: Response) {
    try {
      const clinicId = req.query["clinic-id"];

      if (!clinicId) {
        res.status(400).json({
          error: { message: "Clinic id is required." },
        });

        return;
      }

      // find doctors who have no shift by clinic id (for new doctors)
      const doctors = await User.find({
        role: "doctor",
        "doctorInfo.clinicId": clinicId,
        "doctorInfo.shiftId": { $exists: false },
      }).select("fullName");

      res.json({ data: doctors });
    } catch (err) {}
  }
}

export default DoctorsController;
