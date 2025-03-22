import express from "express";
import { auth, isAdmin, isNotDoctor } from "../middlewares/auth";
import ScheduleController from "../controllers/schedule";

const scheduleRouter = express.Router();

// get current shift
scheduleRouter.get(
  "/current-shift",
  auth,
  isNotDoctor,
  ScheduleController.getCurrentShift
);

// set extra day to true for a specific group
scheduleRouter.put("/extra-day", ScheduleController.setExtraDay);

export default scheduleRouter;
