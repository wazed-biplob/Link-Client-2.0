import React, { FormEvent, useState } from "react";
import {
  useGetPostQuery,
  useNewPostMutation,
  useUpdatePostMutation,
} from "../redux/postApi";

const Modal = ({
  open,
  setOpen,
  _id,
  postId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  postId: string;
}) => {
  const [postData, setPostData] = useState({
    userId: _id,
    postHeading: "",
    postContent: "",
    postPicture: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [newPost, { isLoading }] = useNewPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const { data: { data } = {} } = useGetPostQuery(postId, {
    skip: postId === "",
  });

  // publish new post
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let updatedPostData = { ...postData }; // local copy of postData

    // if image exists then upload it to cloudinary
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "link_cloudinary");
      formData.append("folder", "post_pictures");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsbgpj3iu/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (res.ok) {
          updatedPostData = {
            ...updatedPostData,
            postPicture: data?.secure_url,
          };
        } else {
          console.log(data?.error?.message || "Upload failed");
        }
      } catch (err) {
        console.log("Error uploading image. Error : " + err);
      } finally {
        console.log("Image has been uploaded");
      }
    }
    await newPost(updatedPostData);
    setPostData({ ...postData, postPicture: "" });
    setOpen(false);
  };

  // update post
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    await updatePost({ postId, postData });
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
              {!data?.postPicture && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setImage(e.target.files?.[0] || null)
                  }
                />
              )}

              <input
                placeholder={data?.postHeading ? data?.postHeading : "Heading"}
                onChange={(e) =>
                  setPostData({ ...postData, postHeading: e.target.value })
                }
                className="mb-1 px-1 w-[100%] border outline-none text-xl font-semibold"
              />

              <textarea
                placeholder={data?.postContent ? data?.postContent : "Content"}
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
                onClick={(e) => (postId ? handleUpdate(e) : handleSubmit(e))}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isLoading ? "Processng..." : postId ? "Update" : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
