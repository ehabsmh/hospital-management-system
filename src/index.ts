import express from "express";
import DB from "./database/db";
import "dotenv/config";
import userRouter from "./views/users";
import clinicRouter from "./views/clinics";
import { seedSchedule } from "./models/schedule";
import doctorScheduleRouter from "./views/doctorSchedule";
import scheduleRouter from "./views/schedule";
import cron from "node-cron";
import axios from "axios";
import reservationTypesRouter from "./views/reservationTypes";
import patientsRouter from "./views/patients";
import reservationRouter from "./views/reservation";
import consultationRouter from "./views/consultation";

const app = express();
const PORT = 3000;

// connect and instantiate DB
export const db = new DB();

// Seed initial schedules
(async function () {
  await seedSchedule();
})();

app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1", clinicRouter);
app.use("/api/v1/schedule", doctorScheduleRouter);
app.use("/api/v1/schedule", scheduleRouter);
app.use("/api/v1/reservation-types", reservationTypesRouter);
app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/reservations", reservationRouter);
app.use("/api/v1/consultations", consultationRouter);

// Run the endpoint every saturday at 00:00
cron.schedule("0 0 * * 6", async () => {
  try {
    await axios.put("http://localhost:3000/api/v1/schedule/extra-day");
  } catch (err) {
    console.error("Error running cron job:", err);
  }
});

app.listen(PORT, () =>
  console.log(`Hospital_MS app listening on port ${PORT}!`)
);
