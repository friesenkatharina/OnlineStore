import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import ShippingInfo from "../models/ShippingInfo.js";

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

export default router;
