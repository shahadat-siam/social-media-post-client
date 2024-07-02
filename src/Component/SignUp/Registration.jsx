import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase.config";
import { ref, set } from "firebase/database";
import useAuth from "../Hook/useAuth";
import { imageUpload } from "../api";
import { useState } from "react";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  // console.log(image)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create user using Firebase authentication
      const { user } = await createUser(data.email, data.password);

      // Add additional user data to Realtime Database
      if (user) {
        await set(ref(db, `users/${user.uid}`), {
          username: data.username,
          email: data.email,
        });
        // upload image  and get image
        const image_url = await imageUpload(image);
        // console.log(image_url)
        // update profile
        await updateUserProfile(data.username, image_url);
        toast.success("Successfully registered!");
        navigate("/");
      } else {
        toast.error("Failed to register user.");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md md:mt-8 mt-4 mx-auto bg-gray-100 shadow-md rounded px-8 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-md font-semibold text-start text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && (
            <span className="text-red-500 text-xs mt-1">
              This field is required
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-md font-semibold text-start text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1">
              Please enter a valid email address
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-md font-semibold text-start text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true, minLength: 6 })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">
              Password must be at least 6 characters long
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-md font-semibold text-start text-gray-700"
          >
            {" "}
            Photo:{" "}
          </label>
          <input
            className="mt-1 mb-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
