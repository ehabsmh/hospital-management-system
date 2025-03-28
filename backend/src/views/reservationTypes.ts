import express from "express";
import { auth, isAdmin, isNotDoctor } from "../middlewares/auth";
import ReservationTypeController from "../controllers/reservationTypes";

const reservationTypesRouter = express.Router();

reservationTypesRouter.post(
  "/",
  auth,
  isAdmin,
  ReservationTypeController.createReservationType
);

reservationTypesRouter.get(
  "/",
  auth,
  isNotDoctor,
  ReservationTypeController.getReservationTypes
);

export default reservationTypesRouter;
