import { likes } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

export const likePost = (postId, userId) => {
  const alreadyLiked = likes.find(
    like => like.postId === postId && like.userId === userId
  );

  if (alreadyLiked) return null;

  const newLike = {
    id: uuidv4(),
    postId,
    userId,
  };

  likes.push(newLike);
  return newLike;
};

export const unlikePost = (postId, userId) => {
  const index = likes.findIndex(
    like => like.postId === postId && like.userId === userId
  );

  if (index === -1) return null;

  const removed = likes.splice(index, 1);
  return removed[0];
};

export const getLikesByPost = (postId) => {
  return likes.filter(like => like.postId === postId);
};
