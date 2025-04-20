import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import {
  AppError,
  DuplicationError,
  NotFoundError,
  RequireError,
  UnauthorizedError,
} from "../utils/errorHandlers";
import { sendEmail } from "../utils/emails";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { CustomRequest } from "../middlewares/auth";
import Clinic from "../models/clinic";

class UserController {
  static async signup(req: CustomRequest, res: Response, next: NextFunction) {
    const { fullName, phoneNumber, email, avatar, role, doctorInfo } = req.body;

    const currentUserRole = req.user?.role;

    try {
      // todo: handle that only admins can signup users.
      if (currentUserRole !== "admin")
        throw new AppError(
          "Only Admins can sign up users.",
          "UnauthorizedError",
          401
        );

      // If role is doctor, doctorInfo should be provided.
      if (role !== "doctor" && doctorInfo) {
        throw new AppError(
          "Doctor info should be provided only if the role is doctor.",
          "BadRequestError",
          400
        );
      }

      if (role === "doctor" && !doctorInfo) {
        throw new AppError(
          "Doctor info should be provided.",
          "BadRequestError",
          400
        );
      }

      // check email duplication
      const emailIsFound = await User.findOne({ email });
      if (emailIsFound)
        throw new AppError("Email already exists.", "DuplicationError", 409);

      // Check first name duplication
      const fullNameIsFound = await User.findOne({ fullName });
      if (fullNameIsFound)
        throw new AppError(
          "Full name already exists.",
          "DuplicationError",
          409
        );

      // check phoneNumber duplication
      const userPhoneIsFound = await User.findOne({ phoneNumber });
      if (userPhoneIsFound)
        throw new AppError(
          "phone number already registered.",
          "DuplicationError",
          409
        );

      // Check if the user provides a password while signing up.
      if (req.body.password) {
        throw new AppError(
          "Passwords must be set up only when the user logs in for the first time.",
          "BadRequestError",
          400
        );
      }

      if (role === "doctor") {
        const isClinicExist = await Clinic.findById(doctorInfo?.clinicId);

        if (!isClinicExist) {
          throw new AppError("Clinic does not exist.", "NotFoundError", 404);
        }
      }

      // create user
      const newUser = await User.create({
        fullName,
        phoneNumber,
        email,
        avatar,
        role,
        doctorInfo: doctorInfo ? doctorInfo : undefined,
      });

      // send email to the user with a link to create a password.
      await sendEmail(newUser);

      res.status(201).json({ newUser, message: "User created successfully." });
    } catch (err) {
      next(err);
    }
  }

  static async createPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // End user receives the `id` param after clicking on the button in the email sent to him/her.
    const { userId, password } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user)
        throw new AppError("user does not exist", "NotFoundError", 404);

      if (user.password) {
        throw new AppError(
          "User already has a password.",
          "DuplicationError",
          409
        );
      }

      // Validate password and update, only if it has passed the validation.
      user.password = password;
      await user.validate(["password"]);

      const hashedPw = await bcrypt.hash(password, 10);

      user.password = hashedPw;

      if (!process.env.JWT_SECRET_KEY) {
        throw new AppError(
          "Specify a JWT_SECRET_KEY in your env file.",
          "NotFoundError",
          404
        );
      }

      if (user.role === "doctor") {
        if (user.doctorInfo) {
          user.doctorInfo.isAvailable = true;
        }
      }

      await user.save();

      const userToken = jwt.sign(
        { _id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET_KEY
      );

      res.cookie("Authorization", userToken, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.ON_PRODUCTION === "true", // Use secure cookies in production
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });

      user.password = undefined; // Remove password from the user object

      res.json({ message: "Password created successfully.", user });
    } catch (err) {
      next(err);
    }
  }

  static async checkPassword(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user)
        throw new AppError("user does not exist", "NotFoundError", 404);

      if (user.password) {
        throw new AppError("Password already set.", "DuplicationError", 409);
      }

      res.json({ message: "Password is not set yet." });
    } catch (error) {
      next(error);
    }
  }

  static async signin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    try {
      // fields required
      if (!email) throw new AppError("Email is required", "RequireError", 400);
      if (!password)
        throw new AppError("Password is required", "RequireError", 400);

      // find user
      const user = await User.findOne({ email });
      if (!user) throw new AppError("Email is incorrect", "NotFoundError", 404);

      // if password is undefined, user should create a password.
      if (!user.password) {
        throw new AppError(
          "Password is not set yet. Check your email.",
          "RequireError",
          400
        );
      }

      // Compare password with the hashed one
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new AppError("Password is incorrect", "BadRequestError", 400);
      }

      if (!process.env.JWT_SECRET_KEY) {
        throw new AppError(
          "Specify a JWT_SECRET_KEY in your env file.",
          "NotFoundError",
          404
        );
      }

      if (user.role === "doctor") {
        if (user.doctorInfo) {
          user.doctorInfo.isAvailable = true;
        }

        await user.save();
      }

      // const userObj = user.toObject();
      const userInfo = {
        _id: user._id,
        role: user.role,
        avatar: user.avatar,
        fullName: user.fullName,
        email: user.email,
        doctorInfo: user.role === "doctor" ? user.doctorInfo : undefined,
      };

      const userToken = jwt.sign(userInfo, process.env.JWT_SECRET_KEY);

      res.cookie("Authorization", userToken, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "none", // Prevent CSRF attacks
        secure: process.env.ON_PRODUCTION === "true",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });
      res.json({ user: userInfo });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: CustomRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (user?.role === "doctor" && user.doctorInfo) {
        await User.findByIdAndUpdate(user._id, {
          "doctorInfo.isAvailable": false,
        });
      }

      if (!req.cookies.Authorization) {
        res.status(400).json({ message: "User is not logged in." });
        return;
      }
      res.clearCookie("Authorization", {
        path: "/",
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "none", // Prevent CSRF attacks
        secure: process.env.ON_PRODUCTION === "true",
      });
      res.status(200).json({ message: "User logged out successfully." });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong with the server." });
    }
  }

  static async me(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      if (!user) throw new AppError("User not found.", "NotFoundError", 404);

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async uploadAvatar(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      if (!user) throw new AppError("User not found.", "NotFoundError", 404);

      // Update the user's avatar field with the new image path
      console.log(req.file);
      if (!req.file) {
        throw new AppError("No image file provided.", "RequireError", 400);
      }

      res.status(200).json({
        message: "Image uploaded successfully.",
        avatarPath: req.file?.path,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
