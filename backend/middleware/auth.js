// middleware/auth.js
import jwt from "jsonwebtoken";
import process from "process";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Authorization header is missing");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Token is missing in the header");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token is invalid or expired");
    req.user = user;
    next();
  });
}
