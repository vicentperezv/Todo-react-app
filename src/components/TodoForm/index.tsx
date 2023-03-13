import React from "react";
import "./styles.css";
import { useState,  ChangeEvent } from "react";
import { postTask } from "../../features/tasks/taskSlice";
import { useAppDispatch } from '../../app/hooks'

const TaskForm = () =>{
  const [task, setTask] = useState({
    label: "",
    checked: false   
  });
  const dispatch = useAppDispatch();
 
  
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {    
       
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    //  Dispatch post task
    dispatch(
      postTask(task)
    ); 
    // Reset input
    setTask({label : '', checked : false})     
  };
 

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      
      <input
        type="text"
        name="label"
        onChange={handleChange}
        value={task.label}
        className="todo-input"  
        placeholder="Enter new to do"      
        autoFocus
        required
      />      
      <button type="submit" className="add-todo-button">add to do</button>
    </form>
  );
}

export default TaskForm;