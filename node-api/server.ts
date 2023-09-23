import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors"; // Import ไลบรารี cors

const app = express();
const port = process.env.PORT || 3000;
const mongoURL =
  "mongodb+srv://StephenP:Stephen11@cluster0.qpaeqzw.mongodb.net/IotData";

app.use(express.json());
app.use("/login", cors());

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("เชื่อต่อฐานข้อมูลสำเร็จ");
  })
  .catch((error) => {
    console.log("เกิดข้อผิดพลาด", error);
  });

  app.listen(port, () => {
    console.log(`แอพพลิเคชันกำลังรอที่พอร์ต ${port}`);
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

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ค้นหาผู้ใช้ในฐานข้อมูลตามชื่อผู้ใช้
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }

    // เปรียบเทียบรหัสผ่านที่ผู้ใช้ป้อนกับรหัสผ่านที่ถูกเข้ารหัสในฐานข้อมูล
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
});

const equipmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const EquipmentModel = mongoose.model("equipment", equipmentSchema);

app.post("/insert" , async(req,res) => {
  
})