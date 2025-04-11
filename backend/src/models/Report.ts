import { model, Schema } from "mongoose";

const ReportSchema = new Schema({
  doctorId: {
    type: String,
    required: true,
    ref: "user",
  },
  patientId: {
    type: String,
    required: true,
    ref: "patient",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Report = model("Report", ReportSchema);

export default Report;
