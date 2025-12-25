import express from "express";
import {
  createComment,
  fetchCommentsByPost,
  editComment,
  removeComment,
} from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 protect all comment routes
router.use(authMiddleware);

// Routes
router.post("/:postId", createComment);
router.get("/:postId", fetchCommentsByPost);
router.put("/:id", editComment);
router.delete("/:id", removeComment);

export default router;

