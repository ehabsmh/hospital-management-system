import express from "express";
import DB from "./database/db";
import "dotenv/config";
import userRouter from "./views/users";
import clinicRouter from "./views/clinics";

const app = express();
const PORT = 3000;

// connect and instantiate DB
export const db = new DB();

app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1", clinicRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
