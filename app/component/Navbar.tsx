"use client";
import { useState } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { userId } = useSelector((state: RootState) => state.user);
  return (
    <>
      <div className="sticky top-0 w-[100%] bg-slate-400 py-[1px] px-2">
        <button
          onClick={() => setOpen(true)}
          className="border rounded-md px-2 py-1 bg-grey"
        >
          New Post
        </button>
        <Modal open={open} setOpen={setOpen} _id={userId} />
      </div>
    </>
  );
};
