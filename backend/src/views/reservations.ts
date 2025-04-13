import express from "express";
import { auth, isNotDoctor } from "../middlewares/auth";
import ReservationsController from "../controllers/reservations";

const reservationsRouter = express.Router();

reservationsRouter.post(
  "/",
  auth,
  isNotDoctor,
  ReservationsController.createReservation
);

// Get scheduled reservations by doctor
reservationsRouter.get(
  "/",
  auth,
  ReservationsController.getReservationsByDoctor
);

reservationsRouter.put("/", auth, ReservationsController.editReservation);

reservationsRouter.delete(
  "/:id",
  auth,
  ReservationsController.deleteReservation
);

reservationsRouter.delete(
  "/all",
  auth,
  isNotDoctor,
  ReservationsController.deleteReservations
);

export default reservationsRouter;
