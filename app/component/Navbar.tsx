"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = useSelector((state: RootState) => state.user);
  const { imgURL } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  return (
    <>
      <div className="sticky top-0 w-[100%] bg-[#CDE990] py-[2px] px-2 flex justify-between">
        <div className="flex gap-x-1">
          <button
            onClick={() => setOpen(true)}
            className="border rounded-md px-2 py-1 text-white font-bold bg-slate-700 active:bg-slate-400"
          >
            New Post
          </button>
          <button
            onClick={() => router.push("/")}
            className="border rounded-md px-2 py-1 text-white font-bold bg-slate-700 active:bg-slate-400"
          >
            Log out
          </button>
        </div>
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
        <Modal open={open} setOpen={setOpen} _id={userId} postId="" />
      </div>
    </>
  );
};
