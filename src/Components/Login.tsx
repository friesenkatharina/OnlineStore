import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const token = response.data.token;
      alert("Login successful 🥳 🥳 🥳 🥳  ");

      localStorage.setItem("token", token);
      navigate("/store");
    } catch (error) {
      alert(error.response.data.error || "Ein Fehler ist aufgetreten");
    }
  };

  return (
    <div style={{ backgroundColor: "grey" }} className="w-full h-screen flex">
      <div className="w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center">
        <form
          className="text-center border rounded-lg w-[600px] h-[400px] p-9"
          onSubmit={handleLogin}
        >
          <label>Email</label>
          <br />
          <input
            className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <label>Password</label>
          <br />
          <input
            className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button
            className="w-[200px] h-[50px] border hover:bg-teal-900"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-[50%] h-[100%] flex justify-center items-center bg-teal-800">
        <h2 className="text-3xl text-white">Login</h2>
      </div>
    </div>
  );
}

export default Login;
