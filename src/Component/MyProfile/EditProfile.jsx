// // EditProfile.js

// import React, { useState } from 'react';
// import useAuth from '../Hook/useAuth';
// import useAxiosSecure from '../Hook/useAxiosSecure';
// import toast from 'react-hot-toast';

// const EditProfile = ({ user, onClose }) => {
//   const axiosSecure = useAxiosSecure();
//   const [displayName, setDisplayName] = useState(user.displayName);
//   const [bio, setBio] = useState(user.bio || '');

//   const handleUpdateProfile = async () => {
//     try {
//       const updatedProfile = { displayName, bio };
//       await axiosSecure.put(`/user/${user.id}`, updatedProfile);
//       toast.success('Profile updated successfully');
//       onClose(); // Close the modal or navigate back
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Failed to update profile');
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
//       <div className="mb-4">
//         <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
//           Display Name
//         </label>
//         <input
//           id="displayName"
//           type="text"
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           value={displayName}
//           onChange={(e) => setDisplayName(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//           Bio
//         </label>
//         <textarea
//           id="bio"
//           rows="3"
//           className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         ></textarea>
//       </div>
//       <div className="flex justify-end">
//         <button
//           onClick={handleUpdateProfile}
//           className="px-4 py-2 bg-blue-600 text-white rounded-full flex items-center hover:bg-blue-700 transition duration-300 ease-in-out"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;
