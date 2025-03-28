import { model, Schema } from "mongoose";

const reservationTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: false, versionKey: false }
);

const ReservationType = model("reservation_type", reservationTypeSchema);

export default ReservationType;
