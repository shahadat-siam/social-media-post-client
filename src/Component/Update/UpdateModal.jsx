import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import useAuth from "../Hook/useAuth";
import useAxiosSecure from "../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Shered/LoadingSpinner";

const UpdateModal = ({ isOpen, closeModal, refetch, post }) => {
    const { user  } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [postContent, setPostContent] = useState(post?.content || "");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (post) {
            setPostContent(post.content);
        }
    }, [post]);

    const handleUpdate = async () => {
        try {
            const updatedAt = new Date().toLocaleString(); // Localized date and time string

            const updateData = {
                content: postContent,
                user: {
                    name: user?.displayName,
                    image: user?.photoURL,
                },
                updatedAt,
                email: user?.email,
            };

            const { data } = await axiosSecure.put(`/single-post/${post._id}`, updateData);
            toast.success('Post successfully updated');
            refetch()
            navigate('/profile');
            closeModal(); // Close modal after successful update
        } catch (error) {
            setError(error.message);
            console.error('Error updating post:', error);
        }
    }; 
     

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium text-center leading-6 text-gray-900"
                                >
                                    Update Post
                                </DialogTitle>
                                {error && <div className="text-red-500">{error}</div>}
                                <div className="mt-4">
                                    <textarea
                                        className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="What's on your mind?"
                                        value={postContent}
                                        onChange={(e) => setPostContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mt-6 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateModal;
