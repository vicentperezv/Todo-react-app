import React from "react";
import "./styles.css";

const TodoListItem = ({ id, onCheck, checked, onDelete, label }) => (
  <div className="todo-list-item" key={id}>
    <div
      tabIndex="0"
      role="checkbox"
      aria-checked
      className="todo-list-item-content"
    >
      <input
        tabIndex="-1"
        type="checkbox"
        onChange={() => onCheck(id, checked)}
        checked={checked}
      />
      <span className={checked ? "todo-list-item-checked" : ""}>{label}</span>
    </div>
    <button type="button" className="todo-list-item-delete" onClick={ () => onDelete( id )}>
      x
    </button>
  </div>
);

export default TodoListItem;
