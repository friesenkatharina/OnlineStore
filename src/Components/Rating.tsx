import * as React from "react";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";

const API_URL = "http://localhost:5000/ratings"; // Backend URL

const HalfRating: React.FC = () => {
  const [rating, setRating] = useState<number | null>(2.5);
  const [user, setUser] = useState<string>("defaultUser");
  const [comment, setComment] = useState<string>("");

  const handleRatingChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setRating(newValue);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        rating,
        user,
        comment,
      });
      alert("Rating submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting rating:", error.message);
      alert("Failed to submit rating.");
    }
  };

  return (
    <Stack spacing={2} style={{ marginTop: "80px" }}>
      <Rating
        name="half-rating"
        value={rating}
        precision={0.5}
        onChange={handleRatingChange}
      />
      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmit} style={{ width: "150px" }}>
        Submit Rating
      </button>
    </Stack>
  );
};

export default HalfRating;
