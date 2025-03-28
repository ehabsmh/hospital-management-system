import { model, Schema, Types } from "mongoose";

const consultationSchema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, required: true, ref: "patient" },
    doctorId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    reservationTypeId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId("67e04d4e182214fdd7282915"),
      ref: "reservation_type",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    alertOn: {
      type: Date,
      default: "None",
    },
  },
  { timestamps: true }
);

const Consultation = model("Consultation", consultationSchema);

export default Consultation;
