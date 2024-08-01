import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      const { token, userName } = response.data;
      alert("Login successful 🥳");

      localStorage.setItem("token", token);
      if (userName) {
        localStorage.setItem("userName", userName);
      }

      navigate("/store");
    } catch (error) {
      alert("Error during login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="wrapper" style={{ marginTop: "100px" }}>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className="bx bx-user"></i>
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className="bx bx-lock-alt"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="register-link">
          <p>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
