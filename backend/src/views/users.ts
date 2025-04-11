import express from "express";
import UserController from "../controllers/users";
import { auth, isAdmin } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/sign-up", auth, isAdmin, UserController.signup);
userRouter.put("/create-password", UserController.createPassword);
userRouter.post("/sign-in", UserController.signin);
userRouter.post("/logout", auth, UserController.logout);
userRouter.get("/me", auth, UserController.me);

export default userRouter;
