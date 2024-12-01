import React, { FormEvent, useState } from "react";
import { useNewPostMutation } from "../redux/postApi";

const Modal = ({
  open,
  setOpen,
  _id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
}) => {
  const [postData, setPostData] = useState({
    userId: _id,
    postHeading: "",
    postContent: "",
  });
  const [newPost] = useNewPostMutation();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await newPost(postData);
    setOpen(false);
  };
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className={`flex justify-center items-center px-2 min-h-screen transition-transform duration-500 ease-in-out transform ${
          open ? "scale-100" : "scale-95"
        }`}
      >
        <div
          className="bg-white py-4 px-2 rounded-md shadow-lg w-96 transition-all duration-500 ease-in-out"
          role="dialog"
        >
          <form>
            <div className="max-h-[50vh] py-2">
              {/* <img
                src="https://source.unsplash.com/random/100x100/?5"
                alt=""
                className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
              /> */}
              <input
                placeholder="Heading"
                onChange={(e) =>
                  setPostData({ ...postData, postHeading: e.target.value })
                }
                className="mb-1 px-1 w-[100%] border outline-none text-xl font-semibold"
              />

              <textarea
                placeholder="Text"
                onChange={(e) =>
                  setPostData({ ...postData, postContent: e.target.value })
                }
                className="text-sm px-1 py-2 w-[100%] h-[100px] outline-none first-letter: scroll-auto border text-justify"
              />
            </div>

            <div className="flex mt-4 justify-center space-x-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus:ring outline-none rounded-lg text-white bg-gray-500 px-8 py-2 font-bold active:scale-95 hover:opacity-90"
              >
                Cancel
              </button>

              <button
                onClick={(e) => handleSubmit(e)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
