"use client";
import { usePostTodoMutation } from "@/redux/api/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoAdd.module.scss";

interface IFormInput {
  title: string;
  description: string;
}
const TodoAdd = () => {
  const [postTodo] = usePostTodoMutation();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await postTodo(data);

    reset();
  };

  return (
    <div id={scss.todo}>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
          <h1>Add your todo</h1>
          <div className={scss.fields}>
            <input type="text" {...register("title")} placeholder="Title" />
            <input
              type="text"
              {...register("description")}
              placeholder="Description"
            />

            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;
