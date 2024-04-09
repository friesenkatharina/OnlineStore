import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : "Unknown error"
      );
    }
  };

  return (
    <div className="w-full h-screen flex" style={{ backgroundColor: "grey" }}>
      <div className="w-1/2 h-full bg-[#1a1a1a] text-white flex justify-center items-center">
        <form
          className="text-center border rounded-lg w-[600px] h-[400px] p-9"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label>Email</label>
            <input
              className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 block mt-1"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Username</label>
            <input
              className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 block mt-1"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input
              className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2 block mt-1"
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
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center bg-teal-800">
        <h2 className="text-3xl text-white">Sign Up</h2>
      </div>
    </div>
  );
}

export default SignUp;
