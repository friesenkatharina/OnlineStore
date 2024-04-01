import express from "express";
import cors from "cors";
import "./config.js";
import "./db.connect.js";
import cookieParser from "cookie-parser";
import process from "process";

const port = process.env.PORT;
const app = express(); // Hier rufen Sie express() auf, um eine Instanz zu erstellen

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost/*",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin:", origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to log the method and path of each request, and the body of POST requests
app.use((req, res, next) => {
  console.log(`current request infos: ${req.method}  ${req.path}`);
  if (req.method !== "GET") {
    console.log(`req.body: ${JSON.stringify(req.body)}`);
  }
  console.log("\n");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} \n`);
});
