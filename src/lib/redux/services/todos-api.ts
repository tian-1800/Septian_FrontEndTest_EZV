import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import { CreateTodoRequest, Todo } from "../types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery,
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], { start?: number; limit?: number }>({
      query: ({ start = 0, limit = 10 } = {}) => `/todos?_start=${start}&_limit=${limit}`,
      providesTags: ["Todo"],
    }),
    getTodoById: builder.query<Todo, number>({
      query: (id) => `/todos/${id}`,
      providesTags: (result, error, id) => [{ type: "Todo", id }],
    }),
    createTodo: builder.mutation<Todo, CreateTodoRequest>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useGetTodosQuery, useGetTodoByIdQuery, useCreateTodoMutation } = todosApi;
