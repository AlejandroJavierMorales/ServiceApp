import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../databases/realtimeDataBase";

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPublishers: builder.query({
      query: () => `publishers.json`,
    }),
    getSubscriptions: builder.query({
      query: () => `subscriptions.json`,
    }),
    getSubscriptionsCategories: builder.query({
      query: () => `subscriptions_categories.json`,
    }), 
    getSubscriptions_Type: builder.query({
      query: () => `subscriptions_type.json`,
    })
  }),
});

export const { useGetPublishersQuery, useGetSubscriptionsCategoriesQuery,
  useGetSubscriptionsQuery, useGetSubscriptions_TypeQuery
} = subscriptionsApi;


