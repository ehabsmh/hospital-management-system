import { model, Schema } from "mongoose";

const ReportSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

// const Report = model("Report", ReportSchema);

export default ReportSchema;
