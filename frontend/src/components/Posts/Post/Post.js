import { useDispatch, useSelector } from "react-redux";
import { setCurrentId, deletePost, likePost } from "../../../store/postsSlice";
import { toast } from "react-toastify";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleDelete = (id) => {
    if (!user) {
      toast.error("You must be logged in to delete a post!");
      return;
    }
    dispatch(deletePost(id));
    toast.success("Post deleteded successfully!");
  };

  const handleClick = (id) => {
    if (!user) {
      toast.error("You must be logged in to like a post!");
      return;
    }
    dispatch(likePost(id));
    toast.success("Post Liked successfully!");
  };

  const handleEdit = () => {
    if (!user) {
      toast.error("you must be logged in to edit a post!");
      return;
    }
    dispatch(setCurrentId(post._id));
  };

  return (
    <div className=" rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col justify-between relative">
      <div
        className="h-0 pb-[56.25%] bg-cover bg-center bg-blend-darken opacity-9"
        style={{ backgroundImage: `url(${post.selectedFile})` }}
      ></div>
      <div className="absolute top-5 left-5 text-white">
        <h2 className="text-lg font-bold">{post.creator}</h2>
        <p className="text-sm">{new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <button
        className="absolute top-5 right-5  text-white py-1 px-3 rounded font-semibold flex items-center justify-center"
        onClick={handleEdit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fffafa"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-pencil-off-icon lucide-pencil-off"
        >
          <path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" />
          <path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" />
          <path d="m15 5 4 4" />
          <path d="m2 2 20 20" />
        </svg>
      </button>

      <div className="flex justify-between m-3">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-blue-500 text-xs font-semibold"
            >{`#${tag}`}</span>
          ))}
        </div>
      </div>
      <div className="px-4 py-2">
        <h3 className="font-bold text-lg mb-2">{post.title}</h3>
        <p className="text-gray-600 text-sm break-words overflow-y-auto h-12 scroll-custom">
          {post.message}
        </p>
      </div>
      <div className="px-4 py-2 flex justify-between cursor-pointer">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#f44343"
            stroke="#f44343"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart"
            onClick={() => handleClick(post._id)}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {post.likeCount}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f44343"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash2-icon lucide-trash-2"
          onClick={() => handleDelete(post._id)}
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
      </div>
    </div>
  );
};

export default Post;
