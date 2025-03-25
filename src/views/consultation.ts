import express from "express";
import { auth, isDoctor } from "../middlewares/auth";
import ConsultationController from "../controllers/consultations";

const consultationRouter = express.Router();

consultationRouter.post(
  "/",
  auth,
  isDoctor,
  ConsultationController.newConsultation
);

export default consultationRouter;
