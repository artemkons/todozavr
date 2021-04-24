import React from "react";
import { Link } from "react-router-dom";

let testTodos = ["sosi", "ebi", "pls"];

const TodoItem = ({ title }) => {
  return (
    <Link to="/item" className="link">
      <div className="todo-item">
        <input type="checkbox" className="checkbox"></input>
        <div className="text-container">
          <h3 className="title">{title}</h3>
          <p className="text">Текст - не больше 255 знаков</p>
        </div>
      </div>
    </Link>
  );
};

const TodoList = () => {
  return (
    <div className="todo-list">
      {testTodos.map((e) => (
        <TodoItem title={e} />
      ))}
    </div>
  );
};

export default TodoList;
