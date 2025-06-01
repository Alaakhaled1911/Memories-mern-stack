"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, clearCurrentId } from "../../store/postsSlice";
import { toast } from "react-toastify";

const Form = () => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [errors, setErrors] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [touched, setTouched] = useState({
    creator: false,
    title: false,
    message: false,
    tags: false,
    selectedFile: false,
  });

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const currentId = useSelector((state) => state.posts.currentId);

  // Validate function
  const validate = () => {
    const newErrors = {
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    };

    let isValid = true;

    if (!postData.creator.trim()) {
      newErrors.creator = "Creator is required";
      isValid = false;
    }

    if (!postData.title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!postData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    if (!postData.tags.trim()) {
      newErrors.tags = "Tags are required";
      isValid = false;
    }

    if (!postData.selectedFile && !currentId) {
      newErrors.selectedFile = "Image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  // Find the post being edited if currentId exists
  const post = currentId ? posts.find((p) => p._id === currentId) : null;

  // Populate the form when a post is selected for editing
  useEffect(() => {
    if (post) {
      setPostData({
        creator: post.creator,
        title: post.title,
        message: post.message,
        tags: Array.isArray(post.tags) ? post.tags.join(",") : post.tags,
        selectedFile: post.selectedFile,
      });
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (currentId) {
      dispatch(updatePost({ id: currentId, updatedPost: postData }));
      toast.success("Post updated successfully!");
    } else {
      dispatch(createPost(postData));
      toast.success("Post created successfully!");
    }

    handleClear();
  };

  const handleClear = () => {
    dispatch(clearCurrentId());
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setErrors({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setTouched({
      creator: false,
      title: false,
      message: false,
      tags: false,
      selectedFile: false,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b-2 pb-4">
          {currentId ? "Edit Memory" : "Create a Memory"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Creator Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Creator <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={postData.creator}
              onChange={(e) => {
                setPostData({ ...postData, creator: e.target.value });
              }}
              onBlur={() => handleBlur("creator")}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                errors.creator && touched.creator
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {errors.creator && touched.creator && (
              <p className="mt-1 text-sm text-red-600">{errors.creator}</p>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={postData.title}
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
              }}
              onBlur={() => handleBlur("title")}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                errors.title && touched.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {errors.title && touched.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={postData.message}
              onChange={(e) => {
                setPostData({ ...postData, message: e.target.value });
              }}
              onBlur={() => handleBlur("message")}
              className={`w-full px-4 py-2 border-2 rounded-lg resize-none focus:outline-none ${
                errors.message && touched.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            ></textarea>
            {errors.message && touched.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={postData.tags}
              onChange={(e) => {
                setPostData({ ...postData, tags: e.target.value });
              }}
              onBlur={() => handleBlur("tags")}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                errors.tags && touched.tags
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
            />
            {errors.tags && touched.tags && (
              <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image{" "}
              {!currentId && <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setPostData({ ...postData, selectedFile: reader.result });
                    setErrors({ ...errors, selectedFile: "" });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              onBlur={() => handleBlur("selectedFile")}
              className={`w-full text-gray-600 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 ${
                  errors.selectedFile && touched.selectedFile
                    ? "border-2 border-red-500 rounded-lg"
                    : ""
                }`}
            />
            {errors.selectedFile && touched.selectedFile && (
              <p className="mt-1 text-sm text-red-600">{errors.selectedFile}</p>
            )}
          </div>

          {/* Show current image preview if editing */}
          {currentId && postData.selectedFile && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img
                src={postData.selectedFile || "/placeholder.svg"}
                alt="Current"
                className="h-24 object-cover rounded-md"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 
              text-white py-3 rounded-lg font-semibold transition-colors"
            >
              {currentId ? "UPDATE" : "SUBMIT"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-500 hover:bg-gray-600 
              text-white py-3 rounded-lg font-semibold transition-colors"
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
