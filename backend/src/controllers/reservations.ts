import { NextFunction, Request, Response } from "express";
import {
  AppError,
  DuplicationError,
  NotFoundError,
  RequireError,
} from "../utils/errorHandlers";
import Reservation from "../models/reservation";
import User from "../models/user";
import Patient from "../models/patient";

class ReservationsController {
  static async createReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const doctorId = req.query["doctor-id"];
    const patientId = req.query["patient-id"];

    try {
      if (!doctorId || !patientId) {
        throw new AppError(
          "Missing doctor-id or patient-id query parameter",
          "RequireError",
          400
        );
      }

      // check if doctor id is valid doctor id
      const isDoctor = await User.countDocuments({
        _id: doctorId,
        role: "doctor",
      });
      if (!isDoctor) {
        throw new AppError("Doctor not found", "NotFoundError", 404);
      }

      // check if patient id is valid patient id
      const isPatient = await Patient.countDocuments({ _id: patientId });

      if (!isPatient) {
        throw new AppError("Patient not found", "NotFoundError", 404);
      }

      const { reservationTypeId } = req.body;

      if (!reservationTypeId) {
        throw new AppError(
          "Missing reservationTypeId in request body",
          "RequireError",
          400
        );
      }

      const isFound = await Reservation.findOne({
        doctorId,
        patientId,
      });

      if (isFound) {
        throw new AppError(
          "Reservation already exists",
          "DuplicationError",
          409
        );
      }

      // Create reservation
      const reservation = await Reservation.create({
        doctorId,
        patientId,
        reservationTypeId,
      });

      res.status(201).json(reservation);
    } catch (err) {
      next(err);
    }
  }

  static async getReservationsByDoctor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const doctorId = req.query["doctor-id"];

    try {
      if (!doctorId) {
        throw new AppError(
          "Missing doctor-id query parameter",
          "RequireError",
          400
        );
      }

      const reservations = await Reservation.find({
        doctorId,
        status: "scheduled",
      })
        .populate("patientId")
        .populate("reservationTypeId")
        .sort({ createdAt: 1 });

      res.json(reservations);
    } catch (err) {
      next(err);
    }
  }

  static async editReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const doctorId = req.query["doctor-id"];
    const patientId = req.query["patient-id"];

    try {
      if (!doctorId || !patientId) {
        throw new AppError(
          "Missing doctor-id or patient-id query parameter",
          "RequireError",
          400
        );
      }

      const { reservationTypeId, status } = req.body;

      const reservation = await Reservation.findOneAndUpdate(
        { doctorId, patientId },
        { reservationTypeId, status },
        { new: true }
      );

      res.json(reservation);
    } catch (err) {
      next(err);
    }
  }

  static async deleteReservation(req: Request, res: Response) {
    try {
      await Reservation.findByIdAndDelete(req.params.id);

      res.json({ message: "Reservation cancelled" });
    } catch (err) {
      res.status(500).json({ error: "internal server error" });
    }
  }
  static async deleteReservations(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const isExist = await Reservation.countDocuments({
        date: { $exists: false },
      });
      if (!isExist) {
        throw new AppError(
          "No reservations found to delete",
          "NotFoundError",
          404
        );
      }

      await Reservation.deleteMany({ date: { $exists: false } });

      res.json({ message: "Reservations deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default ReservationsController;
