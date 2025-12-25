import { users } from "../data/store.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsers = () => {
  return users;
};
export const addUser = ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    return null; // Controller will handle error
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // plain text (allowed for this project)
  };

  users.push(newUser);
  return newUser;
};
export const confirmLogin = (email, password) => {
  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    return null;
  }

  return user;
};

