import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../utils/vars";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["getPosts"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: (userId) => `post/post-wall/${userId}`,
      providesTags: ["getPosts"],
    }),
    newPost: build.mutation({
      query: (data) => ({
        url: "post/create-post",
        method: "POST",
        contentType: "application/json",
        body: data,
      }),
      invalidatesTags: ["getPosts"],
    }),
    postProfilePicture: build.mutation({
      query: (userData) => ({
        url: "user/post-profile-picture",
        method: "PATCH",
        contentType: "application/json",
        body: userData,
      }),
      invalidatesTags: ["getPosts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useNewPostMutation,
  usePostProfilePictureMutation,
} = postApi;
