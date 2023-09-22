import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  });

// สร้างโมเดล "User" และระบุชื่อคอลเลคชันเป็น "user_id"
const User = mongoose.model("User", userSchema, "userData");

export default User;
