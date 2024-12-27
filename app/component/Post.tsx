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

export const Post = ({ post, imgURL }: { post: IPost; imgURL: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="flex flex-col border p-6 rounded-lg shadow-md">
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
              Dollores A.
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
                className="object-cover"
                sizes="(max-width:400px), (max-width:400px)"
              />
            </div>
          )}
          <div className="mt-2">
            <h2 className="mb-1 text-xl font-semibold">{post?.postHeading}</h2>
            <p className="text-sm dark:text-gray-600">{post?.postContent}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-2">
            <AiFillLike size={18} color="blue" />

            <p className="text-[16px]">Comment</p>
            <button onClick={() => setOpen(true)} className="text-[16px]">
              Edit
            </button>
            <span>
              <IoMdTrash size={18} color="black" />
            </span>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} _id={userId} postId={post?._id} />
    </>
  );
};
