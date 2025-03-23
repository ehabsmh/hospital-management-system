import express from "express";
import { auth, isNotDoctor } from "../middlewares/auth";
import ReservationController from "../controllers/reservations";

const reservationRouter = express.Router();

reservationRouter.post(
  "/",
  auth,
  isNotDoctor,
  ReservationController.createReservation
);

// Get scheduled reservations by doctor
reservationRouter.get("/", auth, ReservationController.getReservationsByDoctor);
reservationRouter.put("/", auth, ReservationController.editReservation);

export default reservationRouter;
