import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import memories from "../../images/memories.png";
import { logoutSuccess } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutSuccess());
    toast.success("Logged out successfully!");
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between border-b-4 border-blue-500 rounded-lg my-6 py-2 px-4">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-blue-500 text-center sm:mr-4">
          Memories
        </h1>
        <Link to="/">
          <img src={memories} alt="icon" className="h-6 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          // Show user info and logout button when logged in
          <>
            <span className="text-gray-700 font-medium">
              Welcome, {user.result?.firstName}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4h12a1 1 0 100-2H3zM11 7a1 1 0 100 2h6a1 1 0 100-2h-6zM11 11a1 1 0 100 2h6a1 1 0 100-2h-6zM11 15a1 1 0 100 2h6a1 1 0 100-2h-6z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </>
        ) : (
          // Show sign in button when not logged in
          <Link to="/auth">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mt-4 sm:mt-0 transition duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v7a1 1 0 11-2 0V4H4v16h12v-6a1 1 0 112 0v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"
                  clipRule="evenodd"
                />
                <path d="M14 7a1 1 0 01-1 1H7a1 1 0 110-2h6a1 1 0 011 1zM14 11a1 1 0 01-1 1H7a1 1 0 110-2h6a1 1 0 011 1zM12 15a1 1 0 100-2H7a1 1 0 100 2h5z" />
              </svg>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
