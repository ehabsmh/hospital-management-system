import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

// Create a schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,} [A-Zا-ي]{1}[a-zا-ي]{2,}$/.test(v);
      },
      message: `Please insert your quartet name correctly.
      Each name should start with uppercase letter.`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^01[0125)]\d{8}$/.test(v);
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  avatar: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'receptionist']
  },
})

// Hash user password before saving to the database.
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// })

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
}

// Create a model based on the schema
const User = model('user', userSchema);

export default User;
