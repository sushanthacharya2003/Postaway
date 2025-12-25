import { comments } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";
export const addComment = ({ postId, userId, content }) => {
  const newComment = {
    id: uuidv4(),
    postId,
    userId,
    content,
    createdAt: new Date(),
  };

  comments.push(newComment);
  return newComment;
};
export const getCommentsByPost = (postId) => {
  return comments.filter(comment => comment.postId === postId);
};
export const updateComment = (commentId, userId, content) => {
  const comment = comments.find(c => c.id === commentId);

  if (!comment) return null;
  if (comment.userId !== userId) return "UNAUTHORIZED";

  comment.content = content;
  return comment;
};
export const deleteComment = (commentId, userId) => {
  const index = comments.findIndex(c => c.id === commentId);

  if (index === -1) return null;
  if (comments[index].userId !== userId) return "UNAUTHORIZED";

  const deleted = comments.splice(index, 1);
  return deleted[0];
};

