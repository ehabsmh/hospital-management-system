import { Request, Response } from "express";
import User from "../models/user";
import {
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
  static async signup(req: Request, res: Response): Promise<void> {
    const { fullName, phoneNumber, email, avatar, role, doctorInfo } = req.body;

    try {
      // todo: handle that only admins can signup users.
      // if (role !== 'admin') throw new UnauthorizedError("Signup allowed only for admins.");

      // If role is doctor, doctorInfo should be provided.
      if (role !== "doctor" && doctorInfo) {
        res.status(400).json({
          error: {
            message:
              "Doctor info should be provided only if the role is doctor.",
          },
        });

        return;
      }

      if (role === "doctor" && !doctorInfo) {
        res.status(400).json({
          error: {
            message: "Doctor info should be provided if the role is doctor.",
          },
        });

        return;
      }

      // check email duplication
      const emailIsFound = await User.findOne({ email });
      if (emailIsFound) throw new DuplicationError("Email already exists.");

      // check phoneNumber duplication
      const userPhoneIsFound = await User.findOne({ phoneNumber });
      if (userPhoneIsFound)
        throw new DuplicationError("phone number already registered.");

      // Check if the user provides a password while signing up.
      if (req.body.password) {
        res.status(400).json({
          error: {
            message:
              "Passwords must be set up only when the user logs in for the first time.",
          },
        });

        return;
      }

      const isClinicExist = await Clinic.findById(doctorInfo?.clinicId);

      if (!isClinicExist) {
        throw new NotFoundError("Clinic does not exist.");
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
      await sendEmail(newUser);
      res
        .status(201)
        .json({ data: newUser, message: "User created successfully." });
    } catch (err) {
      if (err instanceof DuplicationError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }
      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: err.message });

        return;
      }

      if (err instanceof Error) {
        console.log(err);
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }

  static async createPassword(req: Request, res: Response): Promise<void> {
    // End user receives the `id` param after clicking on the button in the email sent to him/her.
    const { userId, password } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) throw new NotFoundError("user does not exist");

      // Validate password and update, only if it has passed the validation.
      user.password = password;

      await user.validate(["password"]);
      await user.updateOne({ password: await bcrypt.hash(password, 10) });

      // Sign a token and send it in the response body.
      user.password = undefined;

      if (!process.env.JWT_SECRET_KEY) {
        throw new NotFoundError("Specify a JWT_SECRET_KEY in your env file.");
      }

      if (user.role === "doctor") {
        if (user.doctorInfo) {
          user.doctorInfo.isAvailable = true;
        }
        await user.save();
      }

      // const userObj = user.toObject();
      const userToken = jwt.sign(
        { _id: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET_KEY
      );

      res.json({ message: "Password created successfully.", userToken });
    } catch (err) {
      if (
        err instanceof mongoose.Error.ValidationError &&
        Object.keys(err.errors).includes("password")
      ) {
        res.status(400).json({
          error: { message: err.message },
        });

        return;
      }

      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof Error) {
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }

  static async signin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      // fields required
      if (!email) throw new RequireError("Email is required");
      if (!password) throw new RequireError("Password is required");

      // find user
      const user = await User.findOne({ email });
      if (!user) throw new NotFoundError("Email is incorrect");

      // if password is undefined, user should create a password.
      if (!user.password) {
        res.status(400).json({
          error: { message: "Password is not set yet. Check your email." },
        });

        return;
      }

      // Compare password with the hashed one
      const isMatch = await user.comparePassword(password);
      console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ message: "Password is incorrect" });
        return;
      }

      if (!process.env.JWT_SECRET_KEY) {
        throw new NotFoundError("Specify a JWT_SECRET_KEY in your env file.");
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
        sameSite: "strict", // Prevent CSRF attacks
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });
      res.json({ user: userInfo });
    } catch (err) {
      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof RequireError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof Error) {
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("Authorization", { path: "/" });
      res.status(200).json({ message: "User logged out successfully." });
    } catch (err) {
      res.status(500).json({
        error: { message: "Something went wrong with the server." },
      });
    }
  }

  static async me(req: CustomRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      console.log(user);
      if (!user) throw new NotFoundError("User not found.");

      res.status(200).json(user);
    } catch (err) {
      if (err instanceof NotFoundError) {
        res
          .status(err.statusCode)
          .json({ error: { name: err.name, message: err.message } });

        return;
      }

      if (err instanceof Error) {
        res.status(500).json({
          error: { message: "Something went wrong with the server." },
        });
      }
    }
  }
}

export default UserController;
