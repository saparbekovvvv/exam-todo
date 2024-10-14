namespace TODO {
  interface ITodo {
    _id: number | null;
    title: string;
    description: string;
  }
  type GetTodosResponse = ITodo[];
  type GetTodosRequest = void;

  type PostTodoResponse = ITodo;
  type PostTodoRequest = {
    title: string;
    description: string;
  };

  type DeleteTodoResponse = ITodo;
  type DeleteTodoRequest = number;

  type UpdateTodoResponse = ITodo;
  type UpdateTodoRequest = {
    _id: number;
    data: {
      title: string;
      description: string;
    };
  };
}
