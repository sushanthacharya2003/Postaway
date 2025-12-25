import express from "express";
import { signup, signin, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

// User routes (NO AUTH HERE)
router.post("/signup", signup);
router.post("/signin", signin);

// Optional test route
router.get("/users", getUsers);

export default router;

