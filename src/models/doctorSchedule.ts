import { model, Types, Schema } from "mongoose";

const doctorScheduleSchema = new Schema({
  doctor: { type: Types.ObjectId, ref: "user", required: true },
  belongsToGroup: { type: String, ref: "work_schedule", required: true },
  shiftIndex: { type: Number, required: true }, // Index of shift in work_schedule
});

const DoctorSchedule = model("doctor_schedule", doctorScheduleSchema);

export default DoctorSchedule;
