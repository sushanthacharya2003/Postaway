import {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../models/comment.model.js";

// ADD COMMENT
export const createComment = (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Comment content required" });
  }

  const comment = addComment({
    postId: req.params.postId,
    userId: req.user.id,
    content,
  });

  return res.status(201).json(comment);
};

// GET COMMENTS FOR POST
export const fetchCommentsByPost = (req, res) => {
  const comments = getCommentsByPost(req.params.postId);
  return res.status(200).json(comments);
};

// UPDATE COMMENT
export const editComment = (req, res) => {
  const result = updateComment(
    req.params.id,
    req.user.id,
    req.body.content
  );

  if (result === null) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (result === "UNAUTHORIZED") {
    return res.status(403).json({ message: "You cannot edit this comment" });
  }

  return res.status(200).json(result);
};

// DELETE COMMENT
export const removeComment = (req, res) => {
  const result = deleteComment(req.params.id, req.user.id);

  if (result === null) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (result === "UNAUTHORIZED") {
    return res.status(403).json({ message: "You cannot delete this comment" });
  }

  return res.status(200).json({
    message: "Comment deleted successfully",
    comment: result,
  });
};

