import { useState } from "react";
import { FcCalendar, FcGallery } from "react-icons/fc";
import CreatePostModal from "./CreatePostModal";
import useAuth from "../Hook/useAuth";

const CreatePostField = () => {
  const {user} = useAuth()
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="max-w-xl border-[1px] border-gray-200 rounded-lg shadow-sm px-4 py-2 mb-10 mt-6 mx-auto ">
      <div className="flex gap-5">
        <img src={user?.photoURL} className="w-12 h-11 rounded-[100%]" alt="" />
        <div onClick={() => setIsOpen(true)} className="w-full">
          <p className="mt-1 block text-start w-full bg-gray-100 cursor-pointer px-6 py-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            Start a post{" "}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center px-7 pt-4  pb-2">
        <div onClick={() => setIsOpen(true)} className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center gap-1">
          {" "}  
          <FcGallery className="w-6 h-6" /> media
        </div>
        <div className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center gap-1">
          {" "}
          <FcCalendar className="w-6 h-6" /> Event
        </div>
        <div className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center gap-1">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 64 64"
            xmlSpace="preserve"
            width="24px"
            height="24px"
          >
            <style>
              {`
        .st0{fill:#FFD700;}
        .st1{fill:#FF6347;}
        .st2{fill:#4CAF50;}
        .st3{fill:#1E90FF;}
      `}
            </style>
            <g>
              <path
                className="st0"
                d="M2,62c0,1.1,0.9,2,2,2h56c1.1,0,2-0.9,2-2V2c0-1.1-0.9-2-2-2H4C2.9,0,2,0.9,2,2V62z"
              />
              <path className="st1" d="M14,18h36v6H14V18z" />
              <path className="st2" d="M14,28h36v6H14V28z" />
              <path className="st3" d="M14,38h36v6H14V38z" />
            </g>
            <g>
              <path d="M9,10h6v6H9V10z" />
              <path d="M9,20h6v6H9V20z" />
              <path d="M9,30h6v6H9V30z" />
              <path d="M9,40h6v6H9V40z" />
            </g>
          </svg>
          Write article
        </div>
      </div>
      <CreatePostModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default CreatePostField;
