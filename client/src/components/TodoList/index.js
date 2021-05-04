import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let query = `
query {
  allTodos {
    id
    title
    text
  }
}
`;

const TodoItem = ({ title, text }) => {
  return (
    <Link to="/item" className="link">
      <div className="todo-item">
        <input type="checkbox" className="checkbox"></input>
        <div className="text-container">
          <h3 className="title">{title}</h3>
          <p className="text">{text}</p>
        </div>
      </div>
    </Link>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);

  //TODO: Обработать ошибки
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });
      const result = await response.json();
      setTodos(result.data.allTodos);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="todo-list">
        {todos.map((e) => (
          <TodoItem title={e.title} text={e.text} key={e.id} />
        )) || "Fetching"}
      </div>
      <Link to="item/new" className="btn">
        Добавить
      </Link>
    </div>
  );
};

export default TodoList;
