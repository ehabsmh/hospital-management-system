import { NextFunction, Request, Response } from "express";
import {
  AppError,
  DuplicationError,
  RequireError,
} from "../utils/errorHandlers";
import ReservationType from "../models/reservationType";

class ReservationTypeController {
  static async createReservationType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, price } = req.body;

    try {
      if (!name || !price)
        throw new AppError("name and price are required", "RequireError", 400);

      const isFound = await ReservationType.findOne({ name });
      if (isFound)
        throw new AppError("name already exists", "DuplicationError", 409);

      const reservationType = await ReservationType.create({ name, price });
      res.status(201).json({ data: reservationType });
    } catch (err) {
      next(err);
    }
  }

  static async getReservationTypes(req: Request, res: Response) {
    try {
      const reservationTypes = await ReservationType.find();
      res.json({ data: reservationTypes });
    } catch (err) {
      res.json({ error: { message: "internal server error" } });
    }
  }
}

export default ReservationTypeController;
