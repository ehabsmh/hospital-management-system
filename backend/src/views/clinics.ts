import express from "express";
import ClinicController from "../controllers/clinics";
import { auth, isAdmin } from "../middlewares/auth";

const clinicRouter = express.Router();

clinicRouter.post("/clinics", auth, isAdmin, ClinicController.create);
clinicRouter.put("/clinics/:id", auth, isAdmin, ClinicController.edit);

export default clinicRouter;
