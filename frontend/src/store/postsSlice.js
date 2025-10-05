import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../config/api";

const url = API_ENDPOINTS.POSTS;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const data = await response.json();
    return data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedPost }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const data = await response.json();
    return data;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the post");
  }

  return id;
});
export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${url}/${id}/likePost`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Ensure Bearer prefix is always included
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to like post: ${errorData}`);
  }

  const data = await response.json();
  return data;
});

const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentId: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    clearCurrentId: (state) => {
      state.currentId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
      }
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(likePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.loading = false;

      const updatedPost = action.payload;

      const index = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );

      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    });

    builder.addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setCurrentId, clearCurrentId } = postSlice.actions;

export default postSlice.reducer;
