// server.js: Hier wird der Server konfiguriert , die Middleware hinzugefügt und die Routen registriert (usersRoutes und shippingRoutes).

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import process from "process";
// import helmet from "helmet";
// import rateLimit from 'express-rate-limit';
import compression from 'compression';


// import "./config.js";
import "./db.connect.js";
import usersRoutes from "./routes/usersRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";

import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cookieParser());
app.use(express.json());


// Rate Limiting Middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 100, 
// });

// app.use(limiter);

// Compression Middleware
app.use(compression());

const allowedOrigins = [

  "http://localhost:5000",
  "http://localhost:5173",

  // "https://online-store-42yld3yta-katharina-s-projects.vercel.app/",
];



const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin:", origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  withCredentials: true,
};

app.use(cors(corsOptions));

// Middleware to log the method and path of each request, and the body of POST requests
app.use((req, res, next) => {
  console.log(`current request infos: ${req.method} ${req.path}`);
  if (req.method !== "GET") {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
  }
  console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
  next();
});


// app.use(helmet());


// Routes
app.use("/users", usersRoutes);
// app.use("/shipping", shippingRoutes);
app.use("/ratings", ratingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// server
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000} \n`
  );
});
