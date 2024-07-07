import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  user: { type: String, required: true },
  comment: { type: String }, // Add comment field
  timestamp: { type: Date, default: Date.now },
});

export const Rating = mongoose.model("Rating", ratingSchema);
