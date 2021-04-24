import React from "react";

let testTodos = ["sosi", "ebi", "pls"];

const TodoItem = ({ title }) => {
  return (
    <div className="todo-item">
      <input type="checkbox" className="checkbox"></input>
      <div className="text-container">
        <h3 className="title">{title}</h3>
        <p className="text">Текст - не больше 255 знаков</p>
      </div>
    </div>
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
