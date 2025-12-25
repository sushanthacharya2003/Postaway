import { posts } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

export const createPost = ({ caption, imageUrl, userId }) => {
  const newPost = {
    id: uuidv4(),
    caption,
    imageUrl: imageUrl || null,
    userId,
    createdAt: new Date(),
  };

  posts.push(newPost);
  return newPost;
};
export const getAllPosts = () => {
  return posts;
};
export const getPostById = (postId) => {
  return posts.find(post => post.id === postId);
};
export const getPostsByUser = (userId) => {
  return posts.filter(post => post.userId === userId);
};
export const updatePost = (postId, userId, updatedData) => {
  const post = posts.find(post => post.id === postId);

  if (!post) return null;

  // Ownership check
  if (post.userId !== userId) {
    return "UNAUTHORIZED";
  }

  post.caption = updatedData.caption ?? post.caption;
  post.imageUrl = updatedData.imageUrl ?? post.imageUrl;

  return post;
};
export const deletePost = (postId, userId) => {
  const index = posts.findIndex(post => post.id === postId);

  if (index === -1) return null;

  if (posts[index].userId !== userId) {
    return "UNAUTHORIZED";
  }

  const deletedPost = posts.splice(index, 1);
  return deletedPost[0];
};
