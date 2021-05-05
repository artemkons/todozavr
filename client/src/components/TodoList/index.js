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
      <div className="todo-list__item">
        <input type="checkbox" className="checkbox"></input>
        <div>
          <h3 className="todo-list__item__title">{title}</h3>
          <p className="todo-list__item__text">{text}</p>
        </div>
      </div>
    </Link>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }),
        });
        const result = await response.json();
        setTodos(result.data.allTodos);
      } catch (error) {
        setError("Упс... Что-то пошло не так!");
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="wrapper">
      <div className="todo-list">
        {error ||
          todos.map((e) => (
            <TodoItem title={e.title} text={e.text} key={e.id} />
          ))}
      </div>
      <Link to="item/new" className="btn">
        Добавить
      </Link>
    </div>
  );
};

export default TodoList;
