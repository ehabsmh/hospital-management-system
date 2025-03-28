import { Request, Response } from "express";
import { DuplicationError, RequireError } from "../utils/errorHandlers";
import reservationRouter from "../views/reservations";
import ReservationType from "../models/reservationType";

class ReservationTypeController {
  static async createReservationType(req: Request, res: Response) {
    const { name, price } = req.body;

    try {
      if (!name || !price)
        throw new RequireError("name and price are required");

      const isFound = await ReservationType.findOne({ name });
      if (isFound) throw new DuplicationError("name already exists");

      const reservationType = await ReservationType.create({ name, price });
      res.status(201).json({ data: reservationType });
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
