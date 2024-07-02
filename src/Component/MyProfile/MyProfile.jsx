import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import SinglePost from "../Posts/SinglePost";
import { FaEdit } from "react-icons/fa";
import CreatePostField from "../Create/CreatePostField";
import LoadingSpinner from "../../Shered/LoadingSpinner";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: post = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/post/${user?.email}`);
      return data;
    },
  }); 
  if(loading || isLoading) return <LoadingSpinner/>
  return (
    <div>
      <div className="max-w-xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src="/cover1.png"
            alt="Cover"
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <div className="text-center mt-16 px-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {user?.displayName}
          </h1>
          <p className="text-gray-500">Web Developer | Tech Enthusiast</p>
          <button className="mt-4 px-4 py-2 bg-[#0a66c2] text-white rounded-full flex items-center mx-auto hover:bg-blue-700 transition duration-300 ease-in-out">
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Bio</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Hello! I'm {user?.displayName}, a passionate web developer with a
            love for technology and innovation. I explore new tech trends and
            work on personal projects to enhance my skills.
          </p>
        </div>
      </div>
      <div>
        <CreatePostField />
      </div>
      {post.map((post) => (
        <SinglePost key={post._id} post={post} refetch={refetch} />
      ))}
    </div>
  );
};

export default MyProfile;
