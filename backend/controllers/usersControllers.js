// import express from "express";
import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";

// const router = express.Router();

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists.");
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User successfully registered.");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
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
};
