import express from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cors from "cors"; // Import ไลบรารี cors
import { verifyToken } from "./middleware/auth";
const config = require('./config')

const app = express();
const port = process.env.PORT || 8888;
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
    console.log(`Listenning in port ${port}`);
  });
  

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

const UserModel = mongoose.model("userdata", userSchema);

app.get("/getUsers",verifyToken, (req, res) => {
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
    const token = jwt.sign(
       { user_id: newUser._id, email},
       config.secretKey,
       {
        expiresIn: "1h"
       }
    )
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error: any) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username: user.username, email: user.email }, config.secretKey, {
      expiresIn: '1h',
    });
    user.token = token;
    await user.save();
    return res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
});


const equipmentSchema = new mongoose.Schema({
  eq_name: { type: String, required: true },
  eq_direction: { type: String, required: true },
  eq_status: { type: String, required: true },
});

const EquipmentModel = mongoose.model("equipment", equipmentSchema);

app.post("/insertequipment" , async(req,res) => {
  try {
    const { eq_name, eq_direction, eq_status } = req.body;
    const newEquipment = new EquipmentModel ({
      eq_name,
      eq_direction,
      eq_status,
    });

    await newEquipment.save();
    return res.status(201).json({ message : "Insert Equipment Successfully" , newEquipment})
  } catch(error) {
    return res.status(500).json({ message: "Error Insert Equipments" });
  }
})
