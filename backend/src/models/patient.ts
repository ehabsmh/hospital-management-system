import { model, Schema } from "mongoose";

const patientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: {
      medicalHistory: String,
      pastSurgeries: String,
    },
  },
});

const Patient = model("patient", patientSchema);

export default Patient;
