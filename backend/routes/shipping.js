import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import ShippingInfo from "../models/ShippingInfo.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { fullName, address, city, zipCode, country } = req.body;

    if (!fullName || !address || !city || !zipCode || !country) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newShippingInfo = new ShippingInfo({
      fullName,
      address,
      city,
      zipCode,
      country,
    });

    const savedInfo = await newShippingInfo.save();
    res.status(201).json(savedInfo);
  } catch (error) {
    console.error("Error saving shipping info:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
