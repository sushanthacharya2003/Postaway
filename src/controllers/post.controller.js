import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  updatePost,
  deletePost,
} from "../models/post.model.js";
import { CustomError } from "../utils/customError.js";
// CREATE POST
export const addPost = (req, res) => {
  const { caption } = req.body;

  if (!caption) {
    throw new CustomError(400, "Caption is required");
  }

  const post = createPost({
    caption,
    imageUrl: null, // image comes later (multer step)
    userId: req.user.id,
  });
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  return res.status(201).json(post);
};

// GET ALL POSTS
export const fetchAllPosts = (req, res) => {
  const posts = getAllPosts();
  return res.status(200).json(posts);
};

// GET POST BY ID
export const fetchPostById = (req, res) => {
  const post = getPostById(req.params.id);

  if (!post) {
    throw new CustomError(404, "Post not found");
  }

  return res.status(200).json(post);
};

// GET LOGGED-IN USER POSTS
export const fetchUserPosts = (req, res) => {
  const posts = getPostsByUser(req.user.id);
  return res.status(200).json(posts);
};

// UPDATE POST
export const editPost = (req, res) => {
  const result = updatePost(req.params.id, req.user.id, req.body);

  if (result === null) {
    throw new CustomError(404, "Post not found");

  if (result === "UNAUTHORIZED") {
     throw new CustomError(403, "You cannot update this post");
  }

  return res.status(200).json(result);
};
};


// DELETE POST
export const removePost = (req, res) => {
  const result = deletePost(req.params.id, req.user.id);

  if (result === null) {
throw new CustomError(404, "Post not found");
  }

  if (result === "UNAUTHORIZED") {
    throw new CustomError(403, "You cannot delete this post");
  }

  return res.status(200).json({
    message: "Post deleted successfully",
    post: result,
  });
};

