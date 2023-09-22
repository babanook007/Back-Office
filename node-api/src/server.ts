import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
const port = process.env.PORT || 3000;
const mongoURL =
  "mongodb+srv://StephenP:Stephen11@cluster0.qpaeqzw.mongodb.net/IotData";

app.use(express.json());

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("เชื่อต่อฐานข้อมูลสำเร็จ");
  })
  .catch((error) => {
    console.log("เกิดข้อผิดพลาด", error);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("userdata", userSchema);

app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
});

app.listen(port, () => {
  console.log(`แอพพลิเคชันกำลังรอที่พอร์ต ${port}`);
});
