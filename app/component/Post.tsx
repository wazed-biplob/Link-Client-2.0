"use client";
import Image from "next/image";
import { plainTime } from "../utils/TimeFormat";
import { IPost } from "../interface/type";
import Modal from "./Modal";
import { RootState } from "../redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import Link from "next/link";
import { useDeletePostMutation } from "../redux/postApi";

export const Post = ({ post, imgURL }: { post: IPost; imgURL: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = useSelector((state: RootState) => state.user);
  const [deletePost] = useDeletePostMutation();

  // delete post
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await deletePost(post?._id);
      if (res?.data?.success === true) {
        alert("Post deleted successfully");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col border px-2 py-4 rounded-lg shadow-md">
        <div className="flex items-center gap-x-2">
          <div className="w-10 h-10 relative z-[-1]">
            {imgURL && (
              <Image
                alt="user-image"
                src={imgURL}
                fill
                className="rounded-full object-cover"
                sizes="(max-width:40px), (max-width:40px)"
              />
            )}
          </div>

          <div className="flex flex-col">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              Wazed Biplob
            </a>
            <span className="text-xs">{plainTime(post?.createdAt)}</span>
          </div>
        </div>
        <div className="mt-2">
          {post?.postPicture && (
            <div className="min-w-[320px] min-h-[320px] relative z-[-1]">
              <Image
                alt="user-image"
                src={imgURL}
                fill
                className="object-cover rounded-md"
                sizes="(max-width:400px), (max-width:400px)"
              />
            </div>
          )}
          <div className="mt-2">
            <h2 className="mb-1 text-xl font-semibold">{post?.postHeading}</h2>
            <p className="text-sm dark:text-gray-600">{post?.postContent}</p>
          </div>
          <div className="flex items-center gap-x-4 mt-2">
            <Link href="#" onClick={() => alert("not implemented")}>
              <AiFillLike size={20} color="lightblue" />
            </Link>

            <Link
              href="*"
              onClick={() => alert("not implemented")}
              className="text-[16px]"
            >
              Comment
            </Link>
            <button onClick={() => setOpen(true)} className="text-[16px]">
              Edit
            </button>
            <Link href="#">
              <IoMdTrash onClick={handleDelete} size={20} color="grey" />
            </Link>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} _id={userId} postId={post?._id} />
    </>
  );
};
