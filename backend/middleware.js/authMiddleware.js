import jwt from "jsonwebtoken";

import User from "../models/user.js";

const protect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and has the correct format
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Check if token exists
      if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "test");

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(
        error.name === "JsonWebTokenError"
          ? "Not authorized, invalid token"
          : "Not authorized"
      );
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
export default protect;
