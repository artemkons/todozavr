import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";
import DateInput from "./DateInput";
import useReq from "../../hooks/req.hook";
import "react-calendar/dist/Calendar.css";
import "./styles/date.sass";
import { Button } from "react-bulma-components";

/**
 * Creates a todo editor window. This component uses both for adding new todo and edit existing todo.
 * Depending on component's aim it makes one of two mutation queries: addTodo or editTodo.
 * @param {array} Array of todos.
 * @returns Todo editor window.
 */
const TodoEditor = ({ todos }) => {
  let { id } = useParams();

  /**
   * Defines default values depending on component's aim (add or edit todo).
   * @return {object} Object with default values: defValue, defDate, defTime, defHasDeadline.
   */
  const defineDefault = () => {
    if (id) {
      let todo = todos.find((e) => e.id == id);

      return {
        defValue: {
          title: todo.title,
          text: todo.text || "",
        },
        defDate: todo.deadline ? new Date(Number(todo.deadline)) : new Date(),
        defTime: new Date(Number(todo.deadline))
          .toLocaleDateString("ru", {
            hour: "numeric",
            minute: "numeric",
          })
          .split(" ")[1],
        defHasDeadline: !!todo.deadline,
      };
    }

    return {
      defValue: {
        title: "",
        text: "",
      },
      defDate: new Date(),
      defTime: "00:00",
      defHasDeadline: false,
    };
  };

  let { defValue, defDate, defTime, defHasDeadline } = defineDefault();

  const [value, setValue] = useState(defValue);
  const [date, setDate] = useState(defDate);
  const [time, setTime] = useState(defTime);

  const [hasDeadline, setHasDeadline] = useState(defHasDeadline);

  const { loading, error, makeQuery, setError, setLoading } = useReq();

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;

    setValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let deadline_str = "null";
    if (hasDeadline) {
      let deadline = date;
      let [hours, minutes] = time.split(":");
      deadline.setHours(hours);
      deadline.setMinutes(minutes);
      deadline_str = `"${deadline}"`;
    }

    let newTodoQuery = `
    mutation {
      addTodo(title:"${value.title}", text:"${value.text}", deadline:${deadline_str}) {
        id
      }
    }
    `;

    let editTodoQuery = `
    mutation {
      editTodo(id:"${id}", title:"${value.title}", text:"${value.text}", deadline:${deadline_str}) {
        id
      }
    }
    `;

    if (value.title === "") {
      setError("Введите титульник!");
      setLoading(false);
      return;
    }

    if (id) {
      await makeQuery(editTodoQuery, "");
      return;
    }

    await makeQuery(newTodoQuery);
    setValue({
      title: "",
      text: "",
    });
  };

  let handleTime = (e) => {
    setTime(e.target.value);
  };

  if (loading) return <Loading />;

  return (
    <div className="wrapper">
      <div className="todo-editor">
        <form onSubmit={handleSubmit} className="todo-editor__form">
          <Link to="/" className="btn">
            Назад
          </Link>
          <h1>Заголовок</h1>
          <input
            value={value.title}
            onChange={handleChange}
            name="title"
            className={`input ${error ? " is-danger" : ""}`}
            type="text"
            placeholder="Почистить зубы"
          />
          <DateInput
            hasDeadline={hasDeadline}
            setHasDeadline={setHasDeadline}
            time={time}
            handleTime={handleTime}
            date={date}
            setDate={setDate}
          />
          <h1>Комментарий</h1>
          <textarea
            value={value.text}
            onChange={handleChange}
            className="textarea"
            name="text"
            placeholder="Чистить щёткой"
          ></textarea>
          <Button className="btn">{id ? "Изменить" : " Добавить"}</Button>
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
