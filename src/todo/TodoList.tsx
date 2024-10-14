"use client";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/redux/api/todo";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoList.module.scss";
interface IFormInput {
  _id: number;
  title: string;
  description: string;
}

const TodoList = () => {
  const [updateTodoId, setUpdateTodoId] = useState<number | null>(null);
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const { data, error, isLoading } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleDelete = async (_id: number) => {
    await deleteTodo(_id);
  };
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await updateTodo({ _id: updateTodoId!, data });
    setUpdateTodoId(null);
    reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div id={scss.todoList}>
      <div className="container">
        <div className={scss.todoList}>
          <h1>Todo List</h1>
          {data?.map((todo) => (
            <div className={scss.list} key={todo._id}>
              <p>{`title: ${todo.title}`}</p>
              <p>{`desc: ${todo.description}`}</p>
              <button
                type="button"
                className={scss.delete}
                onClick={() => {
                  handleDelete(todo._id!);
                }}
              >
                Delete
              </button>
              {updateTodoId === todo._id ? (
                <form className={scss.form} onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    defaultValue={todo.title}
                    {...register("title")}
                  />
                  <input
                    type="text"
                    defaultValue={todo.description}
                    {...register("description")}
                  />
                  <button className={scss.save} type="submit">
                    Save
                  </button>
                  <button
                    className={scss.cancel}
                    type="button"
                    onClick={() => {
                      setUpdateTodoId(null);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  className={scss.update}
                  type="button"
                  onClick={() => {
                    setUpdateTodoId(todo && todo._id);
                  }}
                >
                  Update
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
