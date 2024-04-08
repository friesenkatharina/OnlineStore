import express from "express";
import cors from "cors";
import "./config.js";
import "./db.connect.js";
import cookieParser from "cookie-parser";
import process from "process";
import usersRoutes from "./routes/usersRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", usersRoutes);

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
