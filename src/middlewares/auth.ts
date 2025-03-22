import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/User";

interface CustomRequest extends Request {
  user?: IUser;
}
function auth(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      res.status(400).send("Specify a JWT_SECRET_KEY in your env file.");
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = <IUser>decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

function isDoctor(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "doctor") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

function isReceptionist(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "receptionist") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

function isNotDoctor(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role === "doctor") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

export { auth, isAdmin, isDoctor, isReceptionist, isNotDoctor };
