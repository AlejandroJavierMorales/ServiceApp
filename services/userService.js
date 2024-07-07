import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const userApi = createApi({
  reducerPath: "getDataOfUser",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["profileImageGet"],
  endpoints: (builder) => ({
    getProfileimage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: {
          image: image,
        },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const { useGetProfileimageQuery, usePostProfileImageMutation } = userApi;
