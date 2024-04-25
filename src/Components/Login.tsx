// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/login", {
//         email,
//         password,
//       });

//       const { token, userName } = response.data;
//       alert("Login successful 🥳 🥳 🥳 🥳  ");

//       localStorage.setItem("token", token);
//       if (userName) {
//         localStorage.setItem("userName", userName);
//       }

//       navigate("/store");
//     } catch (error) {
//       alert("error");
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "800px",

//         marginTop: "150px",
//       }}
//       className="w-full h-screen flex"
//     >
//       <div className="w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center">
//         <form
//           className="text-center border rounded-lg w-[600px] h-[400px] p-9"
//           onSubmit={handleLogin}
//         >
//           <div className="mb-4">
//             <label style={{ padding: "20px" }}>Email</label>
//             <input
//               className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label>Password</label>
//             <input
//               className="w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button
//             className="w-[200px] h-[50px] border hover:bg-teal-900"
//             type="submit"
//           >
//             Login to Makramee Store
//           </button>
//         </form>
//       </div>
//       <div className="w-[50%] h-[100%] flex justify-center items-center bg-teal-800">
//         <h2 className="text-3xl text-white">Login</h2>
//       </div>
//     </div>
//   );
// } // Add closing parenthesis here

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Make sure to import your CSS here

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
      alert("Login successful 🥳");

      localStorage.setItem("token", token);
      if (userName) {
        localStorage.setItem("userName", userName);
      }

      navigate("/store");
    } catch (error) {
      alert("Error during login");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
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
}

export default Login;
