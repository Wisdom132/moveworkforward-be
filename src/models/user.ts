import mongoose, { HookNextFunction } from "mongoose";
// import bcrypt from "bcrypt";
const bcrypt = require('bcrypt')

export interface fields {
    id: mongoose.Types.ObjectId;
    email: string;
    name: string;
    password: string;
}

export type userModel = mongoose.Document & fields;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
});

userSchema.pre<userModel>("save", function (next: HookNextFunction) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

const User = mongoose.model<userModel>("User", userSchema);

export default User;
