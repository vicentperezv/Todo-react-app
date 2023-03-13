import React from "react";
import "./styles.css";
import {  useSelector } from 'react-redux';

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const tasksState = useSelector( state => state.tasks);
  const tasks = tasksState.data;
  
  //get the number of tasks completed
  const taskCompleted = tasks.filter((task) => task.checked).length;

  return <div className="todo-results">Done: {taskCompleted} </div>;
};

export default TodoResults;
