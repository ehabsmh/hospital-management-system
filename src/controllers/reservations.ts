import { Request, Response } from "express";
import {
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import Reservation from "../models/reservation";
import User from "../models/user";
import Patient from "../models/patient";

class ReservationController {
  static async createReservation(req: Request, res: Response) {
    const doctorId = req.query["doctor-id"];
    const patientId = req.query["patient-id"];

    try {
      if (!doctorId || !patientId) {
        throw new RequireError(
          "Missing doctor-id or patient-id query parameter"
        );
      }

      // check if doctor id is valid doctor id
      const isDoctor = await User.countDocuments({
        _id: doctorId,
        role: "doctor",
      });
      if (!isDoctor) {
        throw new NotFoundError("Doctor not found");
      }

      // check if patient id is valid patient id
      const isPatient = await Patient.countDocuments({ _id: patientId });
      if (!isPatient) {
        throw new NotFoundError("Patient not found");
      }

      const { reservationTypeId } = req.body;

      if (!reservationTypeId) {
        throw new RequireError("Missing reservationTypeId in request body");
      }

      const isFound = await Reservation.findOne({
        doctorId,
        patientId,
      });

      if (isFound) {
        throw new DuplicationError("Reservation already exists");
      }

      // Create reservation
      const reservation = await Reservation.create({
        doctorId,
        patientId,
        reservationTypeId,
      });

      res.status(201).json({ data: reservation });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      if (err instanceof DuplicationError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.json({ error: { message: "internal server error" } });
    }
  }

  static async getReservationsByDoctor(req: Request, res: Response) {
    const doctorId = req.query["doctor-id"];

    try {
      if (!doctorId) {
        throw new RequireError("Missing doctor-id query parameter");
      }

      const reservations = await Reservation.find({
        doctorId,
        status: "scheduled",
      })
        .populate("patientId")
        .populate("reservationTypeId")
        .sort({ createdAt: 1 });

      res.json({ data: reservations });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.json({ error: { message: "internal server error" } });
    }
  }

  static async editReservation(req: Request, res: Response) {
    const doctorId = req.query["doctor-id"];
    const patientId = req.query["patient-id"];

    try {
      if (!doctorId || !patientId) {
        throw new RequireError(
          "Missing doctor-id or patient-id query parameter"
        );
      }

      const { reservationTypeId, status } = req.body;

      const reservation = await Reservation.findOneAndUpdate(
        { doctorId, patientId },
        { reservationTypeId, status },
        { new: true }
      );

      res.json({ data: reservation });
    } catch (err) {
      if (err instanceof RequireError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
      }
      res.json({ error: { message: "internal server error" } });
    }
  }
}

export default ReservationController;
