import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TodoList from "./features/todos/TodoList";
import BlogLists from "./features/blog/BlogList";

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}
      <BlogLists />
    </div>
  );
}

export default App;
