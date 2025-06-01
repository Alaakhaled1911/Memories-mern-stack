import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/postsSlice";
import { useEffect } from "react";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  console.log(posts);
  return (
    <div className="grid grid-cols-3 gap-7">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available</p>
      ) : (
        posts?.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
