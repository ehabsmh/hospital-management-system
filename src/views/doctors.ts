import express from "express";
import { auth, isAdmin } from "../middlewares/auth";
import DoctorsController from "../controllers/doctors";

const doctorsRouter = express.Router();

// Get doctors by clinic
doctorsRouter.get("/", auth, isAdmin, DoctorsController.getDoctorsByClinic);

export default doctorsRouter;
