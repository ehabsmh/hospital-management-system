import { model, Schema } from "mongoose";
import ReportSchema from "./Report";
import PrescriptionSchema from "./Prescription";

const CaseRecordSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "patient",
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    report: {
      type: ReportSchema,
    },
    prescription: {
      type: [PrescriptionSchema],
    },
  },
  { timestamps: true }
);

const CaseRecord = model("Case_Record", CaseRecordSchema);
export default CaseRecord;
