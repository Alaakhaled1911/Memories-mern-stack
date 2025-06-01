import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No post with id: ${_id}`);
  }

  try {
    const post = await PostMessage.findById(_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes) {
      post.likes = [];
    }

    const userIdStr = String(req.user._id);
    const index = post.likes.findIndex((id) => id === userIdStr);

    if (index === -1) {
      post.likes.push(userIdStr);
    } else {
      post.likes = post.likes.filter((id) => id !== userIdStr);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likes: post.likes },
      { new: true }
    );

    // Send response with like count for frontend clarity
    res.json({
      ...updatedPost.toObject(),
      likeCount: updatedPost.likes.length, // optional alias for frontend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
