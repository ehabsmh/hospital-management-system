import express from "express";
import UserController from "../controllers/users";
import { auth, isAdmin } from "../middlewares/auth";
import multer from "multer";
import upload from "../utils/avatarStore";

const userRouter = express.Router();

userRouter.post("/sign-up", auth, isAdmin, UserController.signup);
userRouter.put("/create-password", UserController.createPassword);
userRouter.post("/sign-in", UserController.signin);
userRouter.post("/logout", auth, UserController.logout);
userRouter.get("/me", auth, UserController.me);
userRouter.post(
  "/upload-avatar",
  auth,
  isAdmin,
  upload.single("avatar"),
  UserController.uploadAvatar
);

userRouter.get("/check-password/:userId", UserController.checkPassword);

export default userRouter;
