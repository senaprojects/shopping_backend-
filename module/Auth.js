import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    profilePicUrl: {
      type: String,
    },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
export default user;
