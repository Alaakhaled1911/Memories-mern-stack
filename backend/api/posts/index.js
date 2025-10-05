import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "../../config/db.js";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../../controller/postController.js";
import protect from "../../middleware.js/authMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to database
connectDB();

// Routes
app.get("/", getPosts);
app.post("/", protect, createPost);
app.patch("/:id", protect, updatePost);
app.delete("/:id", protect, deletePost);
app.patch("/:id/likePost", protect, likePost);

export default app;
