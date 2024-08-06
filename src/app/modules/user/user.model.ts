import mongoose, { Schema } from "mongoose";
import { TUser } from "../interface";


const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: "user" },
  photo: { type: String },
  dataOfBirth: { type: String, required: true }
},
  {
    timestamps: true
  });

// calculate age:
userSchema.virtual("age").get(function () {
  if (!this.dataOfBirth) null;
  const now = new Date();
  const birthDate = new Date(this.dataOfBirth);
  let age = now.getFullYear() - birthDate.getFullYear();
  const monthDiff = now.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || monthDiff === 0 && now.getDate() < birthDate.getDate()) age--

  return age

})


export const UserModel = mongoose.model<TUser>('User', userSchema);

