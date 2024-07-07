import express from "express";
import {
  addRating,
  getRatings,
  getTopRatings,
} from "../controllers/ratingController.js";

const router = express.Router();

router.post("/add", addRating); // This endpoint is for you to add a rating
router.get("/", getRatings); // This endpoint is for you to view all ratings
router.get("top", getTopRatings); // This endpoint is for you to view the top ratings (rating >= 4

export default router;
