import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/ratings"; // Update to your backend URL

const AdminView: React.FC = () => {
  const [ratings, setRatings] = useState<
    Array<{ rating: number; user: string; comment: string; timestamp: string }>
  >([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(API_URL);
        setRatings(response.data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div>
      <h1>User Ratings</h1>
      <ul>
        {ratings.map((rating, index) => (
          <li key={index}>
            <p>
              {rating.user}: {rating.rating} stars at{" "}
              {new Date(rating.timestamp).toLocaleString()}
            </p>
            <p>{rating.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;
