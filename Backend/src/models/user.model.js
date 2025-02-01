import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: { type: String },
  uid: { type: String },
  creationTime: { type: String },
  lastSignInTime: { type: String },
  emailVerified: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
