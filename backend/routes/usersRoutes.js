import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists.");
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User successfully registered.");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password.");
    }

    res.send("Successfully logged in.");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
});

export default router;
