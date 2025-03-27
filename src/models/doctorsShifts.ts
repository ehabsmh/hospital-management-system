import { model, Types, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

// const doctorScheduleSchema = new Schema({
//   doctor: { type: Types.ObjectId, ref: "user", required: true },
//   belongsToGroup: { type: String, ref: "work_schedule", required: true },
//   shiftIndex: { type: Number, required: true }, // Index of shift in work_schedule
// });

// const DoctorSchedule = model("doctor_schedule", doctorScheduleSchema);

interface IDoctorsShifts {
  doctors: IUser[] | Types.ObjectId[];
  groupId: Schema.Types.ObjectId;
  shiftId: Schema.Types.ObjectId;
}

const doctorsShiftsSchema = new Schema<IDoctorsShifts>({
  doctors: [{ type: Types.ObjectId, ref: "user", required: true }],
  groupId: { type: Types.ObjectId, ref: "work_schedule", required: true },
  shiftId: { type: Types.ObjectId, ref: "Shift", required: true },
});

const DoctorsShifts = model("Doctors_shifts", doctorsShiftsSchema);

export default DoctorsShifts;
