import express, { NextFunction, Request, Response } from "express";
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
import caseRecordsRouter from "./views/caseRecords";
import { AppError } from "./utils/errorHandlers";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["https://hospital-msys.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/public", express.static("public"));

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
app.use("/api/v1/case-record", caseRecordsRouter);

// error handler middleware
app.use(
  (
    error: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
);

// Run the endpoint every saturday at 00:00
cron.schedule("0 0 * * */Sat", async () => {
  try {
    await axios.put(
      `${
        process.env.ON_PRODUCTION
          ? `${process.env.HOST_NAME}/api/v1/schedule/extra-day`
          : "http://localhost:3000/api/v1/schedule/extra-day"
      }`
    );
  } catch (err) {}
});

// Delete reservations every 4 hrs
cron.schedule("10 0,4,8,12,16,20 * * *", async () => {
  try {
    await axios.delete(
      `${
        process.env.ON_PRODUCTION
          ? `${process.env.HOST_NAME}/api/v1/reservations/all`
          : "http://localhost:3000/api/v1/reservations/all"
      }`
    );
  } catch (err) {
    console.error("Error running cron job:", err);
  }
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Hospital_MS app listening on port ${process.env.PORT || PORT}!`)
);
