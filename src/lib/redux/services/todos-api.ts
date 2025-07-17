import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import { Todo } from "../types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery,
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
