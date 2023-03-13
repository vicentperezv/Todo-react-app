import React,{ useEffect } from "react";
import "./styles.css";
import  TodoListItem from "../TodoListItem"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTasks, delTask, patchTask } from "features/tasks/taskSlice";

const TodoList = () => {

  const tasksState = useAppSelector( state => state.tasks);
  const tasks = tasksState.data;
  
  const dispatch = useAppDispatch();
  
  //Render the tasks list
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (todoId) => {
    // Dispatch delTask
    dispatch(delTask({ id: todoId }));
  };

  const toggleCheck = (todoId, isChecked) => {
    // Dispatch delTask
    dispatch(patchTask({ id: todoId, checked: isChecked }));    
  };

  // If there are no tasks, then show a message
  const noTodos = () =>{
    if(tasks.length === 0){
      return(
        <div className="no-todos">
          Looks like you&apos;re absolutely free today!
        </div>
      )
    }    
  }

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {        
        <div className="todo-list-content">
          {
            /* render todos */                  
            tasks.map((task) =>{              
              return TodoListItem({
                id: task.id,
                onCheck: toggleCheck, 
                checked : task.checked, 
                onDelete: handleDelete, 
                label: task.label
              }) 
            })
          }
        </div>
        
      }
      {noTodos()}
      
    </div>
  );
};

export default TodoList;
