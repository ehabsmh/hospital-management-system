import express from "express";
import ClinicController from "../controllers/clinics";
import { auth, isAdmin, isNotDoctor } from "../middlewares/auth";

const clinicRouter = express.Router();

clinicRouter.post("/clinics", auth, isAdmin, ClinicController.create);
clinicRouter.put("/clinics/:id", auth, isAdmin, ClinicController.edit);
clinicRouter.get("/clinics/", auth, isNotDoctor, ClinicController.get);

export default clinicRouter;
