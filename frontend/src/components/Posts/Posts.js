import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/postsSlice";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-7 min-h-[300px]">
      {loading ? (
        // Loading spinner
        <div className="col-span-3 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-3 text-gray-600">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        // No posts available
        <div className="col-span-3 flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-3 text-gray-500">No posts available</p>
        </div>
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
