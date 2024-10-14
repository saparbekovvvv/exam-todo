import TodoAdd from "@/todo/TodoAdd";
import TodoList from "@/todo/TodoList";

const page = () => {
  return (
    <div>
      <TodoAdd />
      <TodoList />
    </div>
  );
};

export default page;
