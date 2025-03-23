import { model, Schema } from "mongoose";

const reservationSchema = new Schema({
  patientId: { type: Schema.Types.ObjectId, required: true, ref: "patient" },
  doctorId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  reservationTypeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
});

const Reservation = model("reservation", reservationSchema);

export default Reservation;
