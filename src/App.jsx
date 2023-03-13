import React from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoForm from "./components/TodoForm";
import "./App.css";
import Toast from "components/Toast";


const App = () => {
  return (
    <div className="root">
      <Toast/>
      <TodoList />
      <TodoResults />
      <TodoForm/>
    </div>
  );
};

export default App;
