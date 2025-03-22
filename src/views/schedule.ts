import express from "express";
import { auth, isNotDoctor } from "../middlewares/auth";
import ScheduleController from "../controllers/schedule";

const scheduleRouter = express.Router();

// get current shift
scheduleRouter.get(
  "/current-shift",
  auth,
  isNotDoctor,
  ScheduleController.getCurrentShift
);

export default scheduleRouter;
