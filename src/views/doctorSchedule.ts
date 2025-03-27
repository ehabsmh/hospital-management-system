import express from "express";
import { auth, isAdmin } from "../middlewares/auth";
import DoctorsShiftsController from "../controllers/doctorsShifts";

const doctorsShiftsRouter = express.Router();

// Add a doctor to a schedule
// POST /api/v1/schedule/doctor-schedule
doctorsShiftsRouter.get(
  "/doctors-shift",
  auth,
  isAdmin,
  DoctorsShiftsController.getDoctorsByShiftId
);

doctorsShiftsRouter.post(
  "/doctors-shift",
  auth,
  isAdmin,
  DoctorsShiftsController.addDoctorToShift
);

// Swap doctor with another doctor in different groups (same specialty)
// POST /api/v1/schedule/doctor-schedule/swap

export default doctorsShiftsRouter;
