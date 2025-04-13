import { Schema } from "mongoose";

const PrescriptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["tablet", "syrup", "injection", "ointment"],
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
});

export default PrescriptionSchema;
