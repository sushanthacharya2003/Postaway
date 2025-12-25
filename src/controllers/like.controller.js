import {
  likePost,
  unlikePost,
  getLikesByPost,
} from "../models/like.model.js";
// LIKE
export const like = (req, res) => {
  const result = likePost(req.params.postId, req.user.id);

  if (!result) {
    return res.status(409).json({ message: "Post already liked" });
  }

  return res.status(201).json({
    message: "Post liked",
    like: result,
  });
};

// UNLIKE
export const unlike = (req, res) => {
  const result = unlikePost(req.params.postId, req.user.id);

  if (!result) {
    return res.status(404).json({ message: "Like not found" });
  }

  return res.status(200).json({
    message: "Post unliked",
  });
};

// GET LIKES
export const fetchLikes = (req, res) => {
  const likes = getLikesByPost(req.params.postId);
  return res.status(200).json({
    count: likes.length,
    likes,
  });
};

