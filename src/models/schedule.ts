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

    shifts: [
      {
        startTime: { type: String, required: true }, // "09:00", "14:30"
        endTime: { type: String, required: true }, // "13:00", "18:00"
        maxDoctors: { type: Number, default: 6 }, // Configurable limit
        _id: false,
      },
    ],

    extraDay: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false, id: false }
);

const initialSchedules = [
  {
    groupName: "Group A",
    availableDays: ["Sunday", "Tuesday", "Thursday"],
    shifts: [
      { startTime: "00:00", endTime: "04:00" },
      { startTime: "04:00", endTime: "08:00" },
      { startTime: "08:00", endTime: "12:00" },
      { startTime: "12:00", endTime: "16:00" },
      { startTime: "16:00", endTime: "20:00" },
      { startTime: "20:00", endTime: "00:00" },
    ],
    extraDay: true,
  },
  {
    groupName: "Group B",
    availableDays: ["Saturday", "Monday", "Wednesday"],
    shifts: [
      { startTime: "00:00", endTime: "04:00" },
      { startTime: "04:00", endTime: "08:00" },
      { startTime: "08:00", endTime: "12:00" },
      { startTime: "12:00", endTime: "16:00" },
      { startTime: "16:00", endTime: "20:00" },
      { startTime: "20:00", endTime: "00:00" },
    ],
  },
];

// Before saving, if extra day is true, add "Friday" to available days
workScheduleSchema.pre("save", function (next) {
  console.log(this);
  if (this.extraDay) this.availableDays.push("Friday");

  next();
});

// Function to seed initial schedules
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

const WorkSchedule = model("work_schedule", workScheduleSchema);

export default WorkSchedule;
