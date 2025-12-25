import express from "express";
import {
  like,
  unlike,
  fetchLikes,
} from "../controllers/like.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 protect all like routes
router.use(authMiddleware);

router.post("/:postId", like);
router.delete("/:postId", unlike);
router.get("/:postId", fetchLikes);

export default router;
