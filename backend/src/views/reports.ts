import express from "express";
import ReportsController from "../controllers/reports";
import { auth, isDoctor } from "../middlewares/auth";
const reportsRouter = express.Router();

reportsRouter.get("/", auth, isDoctor, ReportsController.getReportsByPatientId);
reportsRouter.post("/", auth, isDoctor, ReportsController.createReport);

export default reportsRouter;
