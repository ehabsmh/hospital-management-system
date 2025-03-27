import { model, Schema, Types } from "mongoose";
const workScheduleSchema = new Schema(
  {
    groupName: { type: String, required: true, unique: true },

    availableDays: {
      type: [String],
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      required: true,
    },

    extraDay: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false }
);

const initialSchedules = [
  {
    groupName: "Group A",
    availableDays: ["Sunday", "Tuesday", "Thursday"],
    extraDay: true,
  },
  {
    groupName: "Group B",
    availableDays: ["Saturday", "Monday", "Wednesday"],
  },
];

// Before saving, if extra day is true, add "Friday" to available days
workScheduleSchema.pre("save", function (next) {
  if (this.extraDay) this.availableDays.push("Friday");
  if (!this.extraDay && this.availableDays.includes("Friday"))
    this.availableDays.pop();

  next();
});

const WorkSchedule = model("work_schedule", workScheduleSchema);

export const seedSchedule = async () => {
  try {
    const existingScheduleLength = await WorkSchedule.countDocuments();
    if (existingScheduleLength === 0) {
      await WorkSchedule.create(initialSchedules);
      console.log("Initial work schedules added successfully.");
    } else {
      console.log("Work schedules already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding work schedules:", error);
  }
};

export default WorkSchedule;
