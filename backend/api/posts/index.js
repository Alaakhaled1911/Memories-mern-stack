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
    origin: [
      "https://memories-mern-stack-hvyh-8vhp5rja7.vercel.app",
      "https://memories-mern-stack-hvyh-qjhj7cp8x.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Connect to database
connectDB();

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Routes
app.get("/", getPosts);
app.post("/", protect, createPost);
app.patch("/:id", protect, updatePost);
app.delete("/:id", protect, deletePost);
app.patch("/:id/likePost", protect, likePost);

export default app;
