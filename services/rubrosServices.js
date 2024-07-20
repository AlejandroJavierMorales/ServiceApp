import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const rubrosApi = createApi({
  reducerPath: "getDataOfDatabase",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories.json?orderBy="name"`,
    }),
    getSubcategories: builder.query({
      query: () => `subcategories.json?orderBy="name"`,
    }),
    getSubsubcategories: builder.query({
      query: () => `subsubcategories.json?orderBy="name"`,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetSubcategoriesQuery, useGetSubsubcategoriesQuery } = rubrosApi;
