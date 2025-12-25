import jwt from "jsonwebtoken";
import { addUser, confirmLogin, getAllUsers } from "../models/user.model.js";

// SIGN UP
export const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = addUser({ name, email, password });

  if (!user) {
    return res.status(409).json({ message: "User already exists" });
  }

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

// SIGN IN
export const signin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = confirmLogin(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // JWT creation
  const token = jwt.sign(
    { id: user.id, email: user.email },
    "codingninjas-secret",
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

// OPTIONAL (for testing)
export const getUsers = (req, res) => {
  res.json(getAllUsers());
};

