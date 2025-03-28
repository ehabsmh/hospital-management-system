import express from "express";
import { auth, isAdmin, isNotDoctor } from "../middlewares/auth";
import DoctorsShiftsController from "../controllers/doctorsShifts";

const shiftsRouter = express.Router();

// Get a doctor by shift id and clinic id
shiftsRouter.get("/", auth, isAdmin, DoctorsShiftsController.getDoctor);

// Insert a doctor to doctorsShifts
shiftsRouter.post("/", auth, isAdmin, DoctorsShiftsController.addDoctorToShift);

// get current shift
shiftsRouter.get(
  "/current",
  auth,
  isNotDoctor,
  DoctorsShiftsController.getCurrentShift
);

export default shiftsRouter;
