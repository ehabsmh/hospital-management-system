import express from "express";
import CaseRecordsController from "../controllers/caseRecords";
import { auth, isDoctor } from "../middlewares/auth";

const caseRecordsRouter = express.Router();

caseRecordsRouter.get(
  "/",
  auth,
  isDoctor,
  CaseRecordsController.getDoctorCaseRecords
);

caseRecordsRouter.post(
  "/",
  auth,
  isDoctor,
  CaseRecordsController.addCaseRecord
);
caseRecordsRouter.delete(
  "/:caseId",
  auth,
  isDoctor,
  CaseRecordsController.deleteCaseRecord
);

export default caseRecordsRouter;
