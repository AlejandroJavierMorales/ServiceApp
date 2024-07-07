import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const userApi = createApi({
  reducerPath: "getDataOfUser",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["profileImageGet", "userData"],
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => `users.json`,
      transformResponse: (response) => {
        if (!response) return [];
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key, // asignando Firebase-generated ID como el campo `id`
        }));
      },
      providesTags: ["userData"],
    }),
    getProfileImage: builder.query({
      query: (localId) => `profileImages/${localId}.json`,
      providesTags: ["profileImageGet"],
    }),
    createUserData: builder.mutation({
      query: (payload) => ({
        url: 'users.json',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response, meta, arg) => ({
        id: response.name, // Firebase genera un nuevo ID
        ...arg,
      }),
      invalidatesTags: ["userData"],
    }),
    updateUserData: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `users/${id}.json`,
        method: 'PUT',
        body: payload,
      }),
      transformResponse: (response, meta, arg) => ({
        id: arg.id, // Retorna el ID del usuario junto con los datos actualizados
        ...response,
      }),
      invalidatesTags: ["userData"],
    }),
    postProfileImage: builder.mutation({
      query: ({ image, localId }) => ({
        url: `profileImages/${localId}.json`,
        method: "PUT",
        body: { image },
      }),
      invalidatesTags: ["profileImageGet"],
    }),
  }),
});

export const { 
  useGetProfileImageQuery, 
  useCreateUserDataMutation, 
  useGetUserDataQuery, 
  useUpdateUserDataMutation 
} = userApi;
