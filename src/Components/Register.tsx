import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import React from "react";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      console.log(data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Login Succesfull, Welcome 🥳🥳🥳 ");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ border: "2px solid green", width: "800px", height: "400px" }}>
      <form style={{ marginTop: "200px" }} onSubmit={registerUser}>
        <label style={{ padding: "20px" }}>Name</label>
        <input
          type="text"
          placeholder="enter name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label style={{ padding: "20px" }}>Email</label>
        <input
          type="email"
          placeholder="enter email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />

        <label style={{ padding: "20px" }}>Password</label>
        <input
          type="password"
          placeholder="enter password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button
          style={{ position: "absolute", top: "68%", right: "48%" }}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default Register;
