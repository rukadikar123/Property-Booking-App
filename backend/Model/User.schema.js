import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic:  {
      type: String,
      default: "",
    },
    isHost: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.model("User", UserSchema);

export default User;
