import express from "express";
import PatientController from "../controllers/patients";
import { auth, isNotDoctor } from "../middlewares/auth";

const patientsRouter = express.Router();

patientsRouter.post("/", auth, isNotDoctor, PatientController.newPatient);
patientsRouter.get("/", auth, isNotDoctor, PatientController.getPatient);

export default patientsRouter;
