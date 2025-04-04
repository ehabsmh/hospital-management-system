import express from "express";
import cors from "cors";
import "dotenv/config";
import DB from "./database/db";
import userRouter from "./views/users";
import clinicRouter from "./views/clinics";
import { seedSchedule } from "./models/schedule";
import scheduleRouter from "./views/schedule";
import cron from "node-cron";
import axios from "axios";
import reservationTypesRouter from "./views/reservationTypes";
import patientsRouter from "./views/patients";
import reservationsRouter from "./views/reservations";
import consultationRouter from "./views/consultation";
import { seedShifts } from "./models/shift";
import doctorsRouter from "./views/doctors";
import shiftsRouter from "./views/shifts";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// connect and instantiate DB
export const db = new DB();

// Seed initial schedules
(async function () {
  await seedSchedule();
  await seedShifts();
})();

app.use([express.json(), cookieParser()]);

app.use("/api/v1/auth", userRouter);
app.use("/api/v1", clinicRouter);
app.use("/api/v1/schedule", scheduleRouter);
app.use("/api/v1/reservation-types", reservationTypesRouter);
app.use("/api/v1/patients", patientsRouter);
app.use("/api/v1/reservations", reservationsRouter);
app.use("/api/v1/consultations", consultationRouter);
app.use("/api/v1/doctors", doctorsRouter);
app.use("/api/v1/shifts", shiftsRouter);

// Run the endpoint every saturday at 00:00
cron.schedule("0 0 * * 6", async () => {
  try {
    await axios.put("http://localhost:3000/api/v1/schedule/extra-day");
  } catch (err) {
    console.error("Error running cron job:", err);
  }
});

// Delete reservations every 4 hrs
cron.schedule("10 4 * * *", async () => {
  try {
    await axios.delete("http://localhost:3000/api/v1/reservations/all", {
      withCredentials: true,
    });
    console.log("Deleted");
  } catch (err) {
    console.error("Error running cron job:", err);
  }
});

app.listen(PORT, () =>
  console.log(`Hospital_MS app listening on port ${PORT}!`)
);
