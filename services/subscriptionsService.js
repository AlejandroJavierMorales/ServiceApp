import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const subscriptionsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPublishers: builder.query({
      query: () => `publishers.json?orderBy="id"`,
    }),
    getSubscriptions: builder.query({
      query: () => `subscriptions.json?orderBy="id"`,
    }),
    getSubscriptionsCategories: builder.query({
      query: () => `subscriptions_categories.json?orderBy="id"`,
    }),
    getSubscriptions_Type: builder.query({
      query: () => `subscriptions_type.json?orderBy="id"`,
    }),
  }),
});

export const { useGetPublishersQuery, useGetSubscriptionsCategoriesQuery,
  useGetSubscriptionsQuery, useGetSubscriptions_TypeQuery
} = subscriptionsApi;
