import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import UserModel, { IUserMethods, IUser, IDoctor } from "./../interfaces/User";

export const doctorSchema = new Schema(
  {
    rank: {
      type: String,
      enum: ["استشاري", "اخصائي", "طبيب عام"],
      required: true,
    },
    clinicId: { type: Types.ObjectId, ref: "clinic", required: true },
    shiftId: { type: Types.ObjectId, ref: "Doctors_shifts", default: null },
    isAvailable: { type: Boolean, default: false },
    totalPatients: { type: Number },
    patientsHandled: { type: Number, default: 0 },
    lastSignin: { type: Date },
  },
  { _id: false }
);

// Create a schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  fullName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,}$/.test(
          v
        );
      },
      message: `Please insert your quartet name correctly.
      Each name should start with uppercase letter.`,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^01[0125)]\d{8}$/.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator(v: string) {
        if (v.length < 8) return false;
        return true;
      },
      message: "password must be at least 8 characters or digits",
    },
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "receptionist", "doctor"],
  },

  doctorInfo: {
    type: doctorSchema,
    required: function () {
      return this.role === "doctor";
    },
  },
});

userSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password!);
});

const User = model("user", userSchema);

export default User;
