import express from "express";
import { auth, isDoctor, isNotDoctor } from "../middlewares/auth";
import ConsultationController from "../controllers/consultations";

const consultationRouter = express.Router();

consultationRouter.post(
  "/",
  auth,
  isDoctor,
  ConsultationController.newConsultation
);

consultationRouter.get(
  "/",
  auth,
  isNotDoctor,
  ConsultationController.getConsultation
);

export default consultationRouter;
