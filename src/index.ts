import express from "express";
import DB from "./database/db";
import "dotenv/config";
import userRouter from "./views/users";
import clinicRouter from "./views/clinics";
import { seedSchedule } from "./models/schedule";
import doctorScheduleRouter from "./views/doctorSchedule";
import scheduleRouter from "./views/schedule";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
