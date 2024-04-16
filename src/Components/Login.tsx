import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const { token, userName } = response.data;
      alert("Login successful 🥳 🥳 🥳 🥳  ");

      localStorage.setItem("token", token);
      if (userName) {
        localStorage.setItem("userName", userName);
      }

      navigate("/store");
    } catch (error) {
      alert("error");
    }
  };

  return (
    <div
      style={{ width: "300px", backgroundColor: "grey", marginTop: "50px" }}
      className="w-full h-screen flex"
    >
      <div className="w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center">
        <p></p>

        <form
          className="text-center border rounded-lg w-[600px] h-[400px] p-9"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label>Email</label>
            <input
              className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
