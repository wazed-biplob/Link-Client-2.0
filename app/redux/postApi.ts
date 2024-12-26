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
    getPost: build.query({
      query: (postId) => `post/get-post/${postId}`,
    }),

    updatePost: build.mutation({
      query: ({ postId, postData }) => ({
        url: `post/update-post/${postId}`,
        method: "POST",
        contentType: "application/json",
        body: postData,
      }),
      invalidatesTags: ["getPosts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useNewPostMutation,
  useLazyGetPostsQuery,
  useGetPostQuery,
  useUpdatePostMutation,
} = postApi;
