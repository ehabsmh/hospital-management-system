import { model, Types, Schema } from "mongoose";

const doctorScheduleSchema = new Schema({
  doctor: { type: Types.ObjectId, ref: "User", required: true },
  groupName: { type: String, ref: "WorkSchedule", required: true },
  shiftIndex: { type: Number, required: true }, // Index of shift in WorkSchedule
});

const DoctorSchedule = model("doctorSchedule", doctorScheduleSchema);

export default DoctorSchedule;
