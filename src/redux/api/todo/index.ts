import { api as index } from "..";

const ENDPOINTS = process.env.NEXT_PUBLIC_ENDPOINT;

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getTodos: build.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: `${ENDPOINTS}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: build.mutation<TODO.PostTodoResponse, TODO.PostTodoRequest>({
      query: (body) => ({
        url: `${ENDPOINTS}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: build.mutation<TODO.DeleteTodoResponse, TODO.DeleteTodoRequest>(
      {
        query: (_id) => ({
          url: `${ENDPOINTS}/${_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["todo"],
      }
    ),
    updateTodo: build.mutation<TODO.UpdateTodoResponse, TODO.UpdateTodoRequest>(
      {
        query: ({ _id, data }) => ({
          url: `${ENDPOINTS}/${_id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["todo"],
      }
    ),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = api;
