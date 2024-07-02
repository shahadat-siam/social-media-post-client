import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import { FaLink, FaRegComment } from "react-icons/fa";
import { MdModeEdit, MdMoreVert, MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import toast from "react-hot-toast";
import UpdateModal from "../Update/UpdateModal";
import { FaBookBookmark } from "react-icons/fa6";

const SinglePost = ({ post, refetch }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLike = async () => {
    try {
      await axiosSecure.post(`/posts/${post._id}/like`);
      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosSecure.post(`/posts/${post._id}/unlike`);
      setLikes((prevLikes) => Math.max(0, prevLikes - 1));
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleAddComment = async () => {
    if (commentInput.trim() !== "") {
      const newComment = {
        user: user?.displayName, // Replace with actual user information
        image: user?.photoURL,
        content: commentInput,
        timestamp: new Date().toLocaleString(),
      };
      try {
        await axiosSecure.post(`/posts/${post._id}/comment`, newComment);
        setComments([...comments, newComment]);
        setCommentInput("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/posts/${post._id}`);
      toast.success("Deleted this post");
      refetch(); // Refetch posts to update the UI
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleCopyLink = () => {
    const postLink = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard.writeText(postLink).then(
      () => {
        toast.success("Link copied to clipboard!");
      },
      (err) => {
        console.error("Error copying link:", err);
      }
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm my-4 mx-auto max-w-xl relative ">
      {/* Header with user info, timestamp */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src={post?.user?.image}
            alt="User Profile"
          />
          <div>
            <p className="font-semibold text-start text-lg">
              {post?.user?.name}
            </p>
            <p className="text-gray-500 text-sm">{post?.createdAt}</p>
          </div>
        </div>
        <div>
          <button
            onClick={toggleOptions}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <MdMoreVert className="w-6 h-6" />
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
              <button
                onClick={handleDelete}
                className={`flex ${
                  user?.email === post?.email ? "" : "hidden"
                } items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left`}
              >
                <MdOutlineDelete /> Delete
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className={`flex ${
                  user?.email === post?.email ? "" : "hidden"
                } items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left`}
              >
                <MdModeEdit /> Update
              </button>
              <UpdateModal
                isOpen={isOpen}
                refetch={refetch}
                post={post}
                closeModal={closeModal}
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                <FaLink /> Copy Link
              </button>
              <button className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                <FaBookBookmark /> Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post content */}
      <p className="text-md text-start mb-6">{post?.content}</p>

      {/* Like and Comment buttons */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={likes > 0 ? handleUnlike : handleLike}
          className={`flex items-center space-x-2 ${
            likes > 0
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          <AiFillLike className="w-6 h-6" />
          <span className="font-medium">{likes}</span>
        </button>

        <button
          onClick={handleComment}
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-600"
        >
          <FaRegComment className="w-6 h-6" />
          <span className="font-medium">{comments.length}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <BsSendFill className="w-5 h-5" /> Send
        </button>
      </div>

      {/* Comment section */}
      {showComments && (
        <div className="mb-4">
          {/* Previous comments */}
          {comments.map((comment, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-1">
                <img
                  className="w-10 h-10 rounded-full"
                  src={comment?.image}
                  alt="User Profile"
                />
                <div className="ml-2">
                  <p className="font-semibold text-start">{comment.user}</p>
                  <p className="text-gray-500 text-sm">{comment.timestamp}</p>
                </div>
              </div>
              <p className="text-lg text-start pl-12">{comment.content}</p>
            </div>
          ))}

          {/* Add new comment */}
          <div className="flex items-center space-x-2">
            <textarea
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={handleCommentInputChange}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
