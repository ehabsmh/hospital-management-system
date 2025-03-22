import { Model, Types } from "mongoose";

export interface IDoctor {
  rank: "استشاري" | "أخصائي" | "طبيب عام";
  specialty: string;
  isAvailable: boolean;
  startTime: Date;
  endTime: Date;
  totalPatients?: number;
  patientsHandled?: number;
  lastSignin: Date;
}

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  phoneNumber: string;
  password?: string | null;
  email: string;
  avatar: string;
  role?: "admin" | "receptionist" | "doctor" | null;
  doctorInfo?: IDoctor;
}

export interface IUserMethods {
  comparePassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export default UserModel;
