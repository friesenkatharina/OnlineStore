import express from "express";
import ShippingInfo from "../models/ShippingInfo.js";
import jwt from "jsonwebtoken";
import process from "process";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const newShippingInfo = new ShippingInfo(req.body);
    const savedInfo = await newShippingInfo.save();
    res.status(201).json(savedInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split("")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    if (!user.isAdmin)
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    next();
  });
}

export default router;
