import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Expected format: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, "codingninjas-secret");

    // Attach user info to request
    req.user = decoded;

    next(); // allow request to proceed
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

