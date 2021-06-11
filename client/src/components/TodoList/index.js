import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import CloseSvg from "../../styles/close-button.svg";
import useReq from "../../hooks/req.hook";
import { data } from "browserslist";

/**
 * Creates a todo item.
 * @param {string} title
 * @param {string} text
 * @param {boolean} done
 * @param {string} id
 * @param {function} setTodos
 * @returns Todo item.
 */
const TodoItem = ({ title, text, done, deadline, id, setTodos }) => {
  const { loading, makeQuery } = useReq();

  const handleDelete = async (e) => {
    let query = `
    mutation {
      deleteTodo(id:"${id}") {
        id
        title
        text
      }
    }
    `;

    makeQuery(query);
    setTodos((prev) => prev.filter((el) => el.id != id));
  };

  const handleCheckbox = async (e) => {
    let query = `
    mutation {
      doneTodo(id:"${id}") {
        title
      }
    }
    `;

    makeQuery(query);
    setTodos((prev) =>
      prev.map((el) => {
        if (el.id === id) el.done = !el.done;
        return el;
      })
    );
  };

  data = deadline ? new Date(Number(deadline)) : null;

  return (
    <div className="todo-list__item">
      <input
        type="checkbox"
        className="checkbox"
        checked={done}
        onChange={handleCheckbox}
      ></input>
      <Link to={`/item/${id}/${title}/${text}`} className="link">
        <div className="todo-list__item__container">
          <h3 className="todo-list__item__title">
            {title}
            <p className="todo-list__item__time-input">
              {data ? (
                <FontAwesomeIcon className="svg-icon" icon={faClock} />
              ) : (
                ""
              )}
              {data ? data.toLocaleString("ru") : ""}
            </p>
          </h3>
          <p className="todo-list__item__text">{text}</p>
        </div>
      </Link>
      {loading ? (
        <div className="todo-list__item__loader">Loading...</div>
      ) : (
        <button className="todo-list__item__btn-delete" onClick={handleDelete}>
          {
            <CloseSvg
              width={12}
              height={12}
              className="todo-list__item__btn-delete__svg"
            />
          }
        </button>
      )}
    </div>
  );
};

/**
 * Creates a todo list.
 * @returns Todo list.
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = `
    query {
      allTodos {
        id
        title
        text
        done
        deadline
      }
    }
  `;
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
        setError("Упс... Что-то пошло не так");
      }
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="wrapper">
      <div className="todo-list">
        {error ||
          todos.map((e) => (
            <TodoItem
              title={e.title}
              text={e.text}
              done={e.done}
              deadline={e.deadline}
              key={e.id}
              id={e.id}
              setTodos={setTodos}
            />
          ))}
      </div>
      <Link to="/new" className="btn">
        Добавить
      </Link>
    </div>
  );
};

export default TodoList;
