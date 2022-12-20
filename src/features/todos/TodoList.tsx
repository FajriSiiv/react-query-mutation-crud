import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getTodos,
  addTodos,
  deleteTodos,
  updateTodos,
} from "../../api/todosApi";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: todos,
    isError,
    error,
  } = useQuery("todos", getTodos, {
    select: (data) => data.sort((a: any, b: any) => b.id - a.id),
  });

  const addTodosMutation = useMutation(addTodos, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodosMutation = useMutation(updateTodos, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodosMutation = useMutation(deleteTodos, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodosMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  let content;
  if (isLoading) {
    content = <p>loading...</p>;
  } else if (isError) {
    content = <p>Error...</p>;
  } else {
    content = todos.map((todo: any) => (
      <article key={todo.id}>
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() =>
              updateTodosMutation.mutate({
                ...todo,
                completed: !todo.completed,
              })
            }
          />
          <label>{todo.title}</label>
          <button onClick={() => deleteTodosMutation.mutate({ id: todo.id })}>
            Delete
          </button>
        </div>
      </article>
    ));
  }
  return (
    <div>
      <h1>TodoList</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {content}
    </div>
  );
};

export default TodoList;
