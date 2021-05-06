import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CloseSvg from "../../styles/close-button.svg";

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
    <div className="todo-list__item">
      <input type="checkbox" className="checkbox"></input>
      <Link to="/item" className="link">
        <div>
          <h3 className="todo-list__item__title">{title}</h3>
          <p className="todo-list__item__text">{text}</p>
        </div>
      </Link>
      <button
        className="todo-list__item__btn-delete"
        onClick={() => console.log("Deleted!")}
      >
        {
          <CloseSvg
            width={12}
            height={12}
            className="todo-list__item__btn-delete__svg"
          />
        }
      </button>
    </div>
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
