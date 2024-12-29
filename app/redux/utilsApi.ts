import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const utilsApi = createApi({
  reducerPath: "utilsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.cloudinary.com/v1_1" }),
  endpoints: (builder) => ({
    postPictureToCloudinary: builder.mutation({
      query: (formData) => ({
        url: "/dsbgpj3iu/image/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { usePostPictureToCloudinaryMutation } = utilsApi;
