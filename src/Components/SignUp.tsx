import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("userName", username);
      navigate("/home");
      console.log(response.data);
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : "Unknown error"
      );
    }
  };

  return (
    <div style={{ marginTop: "200p" }} className="wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
