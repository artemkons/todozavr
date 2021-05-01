import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let query = `
query {
  allTodos {
    title
    text
  }
}
`;

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
  const [todos, setTodos] = useState([]);

  useEffect(async () => {
    let response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    let result = await response.json();
    setTodos((prev) => [...prev, result.data.allTodos]);
  }, []);

  return (
    <div className="wrapper">
      <div className="todo-list">
        {[] || todos.map((e) => <TodoItem title={e} />)}
      </div>
      <Link to="item/new" className="btn">
        Добавить
      </Link>
    </div>
  );
};

export default TodoList;
