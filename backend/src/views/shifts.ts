import express from "express";
import { auth, isAdmin, isNotDoctor } from "../middlewares/auth";
import DoctorsShiftsController from "../controllers/doctorsShifts";

const shiftsRouter = express.Router();

shiftsRouter.get(
  "/all",
  auth,
  isNotDoctor,
  DoctorsShiftsController.getAllShifts
);

// Insert a doctor to doctorsShifts
shiftsRouter.post("/", auth, isAdmin, DoctorsShiftsController.addDoctorToShift);

shiftsRouter.delete(
  "/:shiftId",
  auth,
  isAdmin,
  DoctorsShiftsController.deleteDoctorFromShift
);

// get current shift
shiftsRouter.get(
  "/current",
  auth,
  isNotDoctor,
  DoctorsShiftsController.getCurrentShift
);

// Get a doctor by shift id and clinic id
shiftsRouter.get("/:id", auth, isNotDoctor, DoctorsShiftsController.getDoctor);

export default shiftsRouter;
