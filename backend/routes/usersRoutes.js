// Assuming your routes file is located at routes/usersRoutes.js
import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", usersControllers.register);
router.post("/login", usersControllers.login);
router.post("/logout", usersControllers.logout);

export default router;
