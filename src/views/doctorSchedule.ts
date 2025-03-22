import express from "express";
import DoctorScheduleController from "../controllers/doctorSchedule";
import { auth, isAdmin } from "../middlewares/auth";

const doctorScheduleRouter = express.Router();

// Add a doctor to a schedule
// POST /api/v1/schedule/doctor-schedule
doctorScheduleRouter.post(
  "/doctor-schedule",
  auth,
  isAdmin,
  DoctorScheduleController.assignSchedule
);

// Swap doctor with another doctor in different groups (same specialty)
// POST /api/v1/schedule/doctor-schedule/swap

export default doctorScheduleRouter;
