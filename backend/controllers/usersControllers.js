import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

// REGISTER
export const register = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send("User already exists.");
    }

    const user = new User({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send("User successfully registered. 🥳 🥳");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error.message);
  }
};

// LOGIN
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

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send token in a secure, HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict",
    });

    res.json({ userName: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
};

// LOGOUT
export const logout = (req, res) => {
  try {
    res.status(200).send("Successfully logged out. Goodbye!");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send(error.message);
  }
};
