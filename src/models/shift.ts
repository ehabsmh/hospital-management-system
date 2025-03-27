import { model, Schema } from "mongoose";

const shiftSchema = new Schema({
  startTime: { type: String, required: true }, // "09:00", "14:30"
  endTime: { type: String, required: true }, // "13:00", "18:00"
});

const Shift = model("Shift", shiftSchema);

const initialShifts = [
  { startTime: "00:00", endTime: "04:00" },
  { startTime: "04:00", endTime: "08:00" },
  { startTime: "08:00", endTime: "12:00" },
  { startTime: "12:00", endTime: "16:00" },
  { startTime: "16:00", endTime: "20:00" },
  { startTime: "20:00", endTime: "00:00" },
];

export const seedShifts = async () => {
  try {
    const existingShiftsLength = await Shift.countDocuments();
    if (existingShiftsLength === 0) {
      await Shift.create(initialShifts);
      console.log("Initial shifts added successfully.");
    } else {
      console.log("Shifts already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding shifts:", error);
  }
};

export default Shift;
