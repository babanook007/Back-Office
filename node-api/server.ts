import mongoose from "mongoose";
import User from "./schemas/user";
const url: string = "mongodb+srv://StephenP:Stephen11@cluster0.qpaeqzw.mongodb.net/";

mongoose.connect(url)
  .then(() => {
    console.log("เชื่อต่อฐานข้อมูลสำเร็จ");
  })
  .catch((error) => {
    console.log("เกิดข้อผิดพลาด", error);
  });

const user = new User({
  username: "Satavit",
});

user.save().then(() => console.log("Hello World"));