import express from "express";
import UserController from "../controllers/users";

const userRouter = express.Router();

userRouter.post("/sign-up", UserController.signup);
userRouter.put("/create-password", UserController.createPassword);
userRouter.post("/sign-in", UserController.signin);
userRouter.post("/logout", UserController.logout);

export default userRouter;
