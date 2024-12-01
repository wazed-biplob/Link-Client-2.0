// src/store/api/postApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserLogin } from "../interface/type";

// const API_URL = "https://link-server-beta.vercel.app/api/v1";
const API_URL = "http://localhost:5000/api/v1";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData: IUserLogin) => ({
        url: "/auth/login",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
