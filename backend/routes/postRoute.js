import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controller/postController.js";
import protect from "../middleware.js/authMiddleware.js";

const router = express.Router();
router.get("/", getPosts);
router.post("/", protect, createPost);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.patch("/:id/likePost", protect, likePost);
export default router;
