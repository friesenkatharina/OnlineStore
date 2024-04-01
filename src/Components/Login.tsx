import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../index.css";

function Login() {
  // const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      // Handle response
      if (response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Anmeldung fehlgeschlagen!");
      }
      setData({ email: "", password: "" });
      // navigate("/");
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Anmeldung fehlgeschlagen!");
      }
      console.error(error);
    }
  };

  return (
    <div style={{ border: "2px solid green", width: "600px", height: "400px" }}>
      <h1>Login</h1>
      <form style={{ marginTop: "200px" }} onSubmit={loginUser}>
        <label style={{ padding: "20px" }}>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <br />
        <label style={{ padding: "10px" }}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="current-password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          style={{
            width: "150px",
            marginTop: "10px",
            position: "absolute",
            top: "60%",
            right: "88%",
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
