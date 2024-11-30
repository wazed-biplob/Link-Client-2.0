import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://link-server-beta.vercel.app/api/v1/",
  }),
  tagTypes: ["getPosts"],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => "post/post-wall",
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
} = baseApi;
