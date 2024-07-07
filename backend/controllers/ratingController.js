import { Rating } from "../models/ratingModel.js";

export const addRating = async (req, res) => {
  try {
    const { rating, user, comment } = req.body;
    const newRating = new Rating({ rating, user, comment });
    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ timestamp: -1 }).limit(4); // Fetch the latest 4 ratings
    res.status(200).json(ratings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTopRatings = async (req, res) => {
  try {
    const topRatings = await Rating.find({ rating: { $gte: 4 } })
      .sort({ timestamp: -1 })
      .limit(4); // Fetch the latest 4 ratings with rating >= 4
    res.status(200).json(topRatings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
