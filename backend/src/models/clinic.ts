import { model, Schema } from "mongoose";

const clinicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: false, versionKey: false }
);

const Clinic = model("clinic", clinicSchema);

export default Clinic;
