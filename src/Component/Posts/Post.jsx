import { useQuery } from "@tanstack/react-query";
import SinglePost from "./SinglePost";
import useAxiosSecure from "../Hook/useAxiosSecure"; 
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../../Shered/LoadingSpinner";

const Post = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts`);
      return data;
    },
  });

  if (loading || isLoading) return <LoadingSpinner />;
  refetch()

  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} refetch={refetch} />
      ))}
    </div>
  );
};

export default Post;






// import { useState } from "react";
// import { AiFillLike } from "react-icons/ai";
// import { BsSendFill } from "react-icons/bs";
// import { FaRegComment } from "react-icons/fa";
// import { MdModeEdit, MdMoreVert, MdOutlineDelete } from "react-icons/md";
// import LoadingSpinner from "../../Shered/LoadingSpinner";
// import useAuth from "../Hook/useAuth";
// import useAxiosSecure from "../Hook/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import SinglePost from "./SinglePost";

// const Post = () => {
//   const { loading } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [commentInput, setCommentInput] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);

//   const {
//     data: posts = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/posts`);
//       return data;
//     },
//   });
//   console.log(posts);

//   const handleLike = () => {
//     setLikes((prevLikes) => prevLikes + 1);
//   };

//   const handleUnlike = () => {
//     setLikes((prevLikes) => prevLikes - 1);
//   };

//   const handleComment = () => {
//     setShowComments(!showComments);
//   };

//   const handleCommentInputChange = (e) => {
//     setCommentInput(e.target.value);
//   };

//   const handleAddComment = () => {
//     if (commentInput.trim() !== "") {
//       const newComment = {
//         user: "John Doe", // Replace with actual user information
//         content: commentInput,
//         timestamp: new Date().toLocaleString(),
//       };
//       setComments([...comments, newComment]);
//       setCommentInput("");
//       setShowComments(false); // Hide comment input after posting
//     }
//   };

//   const toggleOptions = () => {
//     setShowOptions(!showOptions);
//   };

//   const handleUpdate = () => {
//     // Implement update logic
//     setShowOptions(false); // Close options menu after action
//   };

//   const handleDelete = () => {
//     // Implement delete logic
//     setShowOptions(false); // Close options menu after action
//   };

//   if (loading) return <LoadingSpinner />;
//   return (
//     <div>
//       {posts.map((post) => (
//         <SinglePost
//           key={post._id}
//           post={post}
//           comments={comments}
//           commentInput={commentInput}
//           showOptions={showOptions}
//           showComments={showComments}
//           likes={likes}
//           handleLike={handleLike}
//           handleUnlike={handleUnlike}
//           handleComment={handleComment}
//           handleCommentInputChange={handleCommentInputChange}
//           handleAddComment={handleAddComment}
//           handleDelete={handleDelete}
//           handleUpdate={handleUpdate}
//           toggleOptions={toggleOptions}
//         >
//           {" "}
//         </SinglePost>
//       ))}
//     </div>
//   );
// };

// export default Post;
