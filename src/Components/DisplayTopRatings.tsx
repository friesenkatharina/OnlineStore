import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

const API_URL = "http://localhost:5000/ratings"; // Backend URL

const DisplayTopRatings: React.FC = () => {
  const [ratings, setRatings] = useState<
    Array<{ rating: number; user: string; comment: string; timestamp: string }>
  >([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${API_URL}/top`);
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <Grid container spacing={2} direction="row" style={{ marginTop: "20px" }}>
      {ratings.map((rating, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>User:</strong> {rating.user}
            </p>
            <p>
              <strong>Rating:</strong> {rating.rating} stars
            </p>
            <p>
              <strong>Comment:</strong> {rating.comment}
            </p>
            <p>
              <small>
                <strong>Date:</strong>{" "}
                {new Date(rating.timestamp).toLocaleString()}
              </small>
            </p>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayTopRatings;
