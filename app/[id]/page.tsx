"use client";
import { useEffect, useState } from "react";
import { Navbar } from "../component/Navbar";
import { Post } from "../component/Post";
import { IPost } from "../interface/type";
import { useGetPostsQuery } from "../redux/postApi";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { API_URL } from "../utils/vars";

const UserProfile = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const { data, isLoading } = useGetPostsQuery(userId);
  const [succ, setSucc] = useState<boolean>(false);
  const imgURL = useSelector((state: RootState) => state.user.imgURL);

  useEffect(() => {
    if (data) {
      setSucc(true);
    }
  }, [data]);
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex flex-col gap-y-4 py-2 px-2">
        {!isLoading && succ && data?.success === true ? (
          data?.data?.map((post: IPost) => (
            <Post key={post?._id} post={post} imgURL={imgURL} />
          ))
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
