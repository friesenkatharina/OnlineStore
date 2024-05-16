import { User } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

// REGISTER
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
    console.log(user);
    await user.save();
    res.status(201).send("User successfully registered.");
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

    // Generieren des Tokens
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Senden des Tokens im Response
    res.json({ token: token, userName: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
};

// LOGOUT
export const logout = (req, res) => {
  try {
    res.status(200).send("Successfully logged out.");
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).send(error.message);
  }
};
