import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../databases/realtimeDataBase';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `todonotes.json`,
      transformResponse: (response) => {
        if (!response) return [];
        return Object.keys(response).map(key => ({
          ...response[key],
          id: key, // asignando Firebase-generated ID como el campo `id`
        }))
        .sort((a, b) => b.id.localeCompare(a.id)); // Ordenando por id descendente
      },
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todonotes.json',
        method: 'POST',
        body: newTodo,
      }),
      transformResponse: (response, meta, arg) => ({ id: response.name, ...arg }),
    }),
    removeTodo: builder.mutation({
      query: (id) => ({
        url: `todonotes/${id}.json`,
        method: 'DELETE',
      }),
    }),
    editTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `todonotes/${id}.json`,
        method: 'PATCH',
        body: todo,
      }),
      transformResponse: (response, meta, arg) => ({ id: arg.id, ...arg }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useEditTodoMutation } = todoApi;
