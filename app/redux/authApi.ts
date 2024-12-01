// src/store/api/postApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserLogin } from "../interface/type";
import { API_URL } from "../utils/vars";

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
