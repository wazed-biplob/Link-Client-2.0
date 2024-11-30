"use client";
import Image from "next/image";
import { plainTime } from "../utils/TimeFormat";
import { IPost } from "../interface/type";

export const Post = ({ post, imgURL }: { post: IPost; imgURL: string }) => {
  return (
    <>
      <div className="flex flex-col border p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-x-2">
          <div>
            {imgURL && (
              <Image
                alt="user-image"
                height={40}
                width={40}
                src={imgURL}
                className="object-cover border rounded-full shadow"
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
        <div>
          {/* <img
            src=""
            alt=""
            className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
          /> */}
          <h2 className="mb-1 text-xl font-semibold">{post?.postHeading}</h2>
          <p className="text-sm dark:text-gray-600">{post?.postContent}</p>
        </div>
      </div>
    </>
  );
};