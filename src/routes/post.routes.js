import express from "express";
import {
  addPost,
  fetchAllPosts,
  fetchPostById,
  fetchUserPosts,
  editPost,
  removePost,
} from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/upload.middleware.js";

const router = express.Router();

// 🔐 Protect all post routes
router.use(authMiddleware);

// Routes
router.post("/", addPost);
router.get("/", fetchAllPosts);
router.get("/user", fetchUserPosts);
router.post("/", upload.single("image"), addPost);
router.put("/:id", upload.single("image"), editPost);
router.get("/:id", fetchPostById);
router.put("/:id", editPost);
router.delete("/:id", removePost);

export default router;

