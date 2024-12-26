"use client";
import { Navbar } from "../component/Navbar";
import { Post } from "../component/Post";
import { IPost } from "../interface/type";
import { useGetPostsQuery } from "../redux/postApi";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { userId } = useSelector((state: RootState) => state.user);
  const { data } = useGetPostsQuery(userId);
  const imgURL = useSelector((state: RootState) => state.user.imgURL);

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="flex flex-col gap-y-4 py-2 px-2">
        {data?.success === true ? (
          data?.data?.map((post: IPost) => (
            <Post key={post?._id} post={post} imgURL={imgURL} />
          ))
        ) : (
          <span>No Posts</span>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
