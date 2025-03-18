import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import UserModel, { IUserMethods, IUser, IDoctor } from "./../interfaces/User";

const doctorSchema = new Schema<IDoctor>({
  rank: {
    type: String,
    enum: ["استشاري", "أخصائي", "طبيب عام"],
    required: true,
  },
  specialty: { type: String, ref: "Clinic", required: true },
  isAvailable: { type: Boolean, default: false },
  avatar: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalPatients: { type: Number },
  patientsHandled: { type: Number, default: 0 },
  lastSignin: { type: Date, required: true },
});

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
