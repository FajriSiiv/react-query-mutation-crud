import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const todosApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const getTodos = async () => {
  const response = await todosApi.get("/todos");
  return response.data;
};

export const addTodos = async (todo: any) => {
  return await todosApi.post("/todos", todo);
};

export const updateTodos = async (todo: Todo) => {
  return await todosApi.patch(`/todos/${todo.id}`, todo);
};

export const deleteTodos = async ({ id }: { id: any }) => {
  return await todosApi.delete(`/todos/${id}`, id);
};

export default todosApi;
