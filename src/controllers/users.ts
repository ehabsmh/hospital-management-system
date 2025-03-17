import { Request, Response } from "express";
import User from "../models/user";
import { DuplicationError } from "../utils/errorHandlers";

class UserController {
  static async signUp(req: Request, res: Response) {
    const { fullName, phoneNumber, email, avatar, role } = req.body;
    try {
      // check email duplication
      const emailIsFound = await User.findOne({ email });
      if (emailIsFound) throw new DuplicationError("Email already exists.");


      // check phoneNumber duplication
      const userPhoneIsFound = await User.findOne({ phoneNumber });
      if (userPhoneIsFound) throw new DuplicationError("phone number already registered.");

      // Check if the user provides a password while signing up.
      if (req.body.password) return res.status(400).json({ error: { message: "Passwords must be set up only when the user logs in for the first time." } })

      // create user
      const newUser = await User.create({ fullName, phoneNumber, email, avatar, role });
      res.status(201).json({ data: newUser, message: "User created successfully." });
    } catch (err) {
      if (err instanceof Error) {
        if (err instanceof DuplicationError) {
          return res.status(err.statusCode).json({ error: { name: err.name, message: err.message } });
        }
        res.status(500).json({ error: { message: "Something went wrong with the server." } });
      }
    }
  }
}

export default UserController;
