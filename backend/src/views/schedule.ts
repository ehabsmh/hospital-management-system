import express from "express";
import { auth, isNotDoctor } from "../middlewares/auth";
import ScheduleController from "../controllers/schedule";

const scheduleRouter = express.Router();

// set extra day to true for a specific group
scheduleRouter.put("/extra-day", ScheduleController.setExtraDay);

scheduleRouter.get("/", ScheduleController.getGroups);

export default scheduleRouter;
