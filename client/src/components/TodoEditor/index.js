import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";
import DateInput from "./DateInput";
import useReq from "../../hooks/req.hook";
import "react-calendar/dist/Calendar.css";
import "./styles/date.sass";
import { Button } from "react-bulma-components";

/**
 * Creates a todo editor window. This component uses both for adding new todo and edit existing todo.
 * Depending on component's aim component makes one of following queries: mutation - addTodo or editTodo.
 * @param {array} Array of todos.
 * @returns Todo editor window.
 */
const TodoEditor = ({ todos }) => {
  const { userId } = useContext(AuthContext);
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
        defTime: todo.deadline
          ? new Date(Number(todo.deadline))
              .toLocaleDateString("ru", {
                hour: "numeric",
                minute: "numeric",
              })
              .split(" ")[1]
          : "00:00",
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

  const [makeMutation, , { loading, error, setLoading, setError }] = useReq();

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
      addTodo(userId: "${userId}", title:"${value.title.trim()}", text:"${
      value.text
    }", deadline:${deadline_str}) {
        id
      }
    }
    `;

    let editTodoQuery = `
    mutation {
      editTodo(userId: "${userId}", todoId:"${id}", title:"${value.title.trim()}", text:"${
      value.text
    }", deadline:${deadline_str}) {
        id
      }
    }
    `;

    if (value.title === "") {
      setError("?????????????? ??????????????????!");
      setLoading(false);
      return;
    }

    makeMutation(id ? editTodoQuery : newTodoQuery);
    if (id) {
      return;
    }

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
            ??????????
          </Link>
          <h1>??????????????????</h1>
          <input
            value={value.title}
            onChange={handleChange}
            name="title"
            className={`input ${error ? " is-danger" : ""}`}
            type="text"
            placeholder="?????????????????? ????????"
          />
          <DateInput
            hasDeadline={hasDeadline}
            setHasDeadline={setHasDeadline}
            time={time}
            handleTime={handleTime}
            date={date}
            setDate={setDate}
          />
          <h1>??????????????????????</h1>
          <textarea
            value={value.text}
            onChange={handleChange}
            className="textarea"
            name="text"
            placeholder="?????????????? ????????????"
          ></textarea>
          <Button className="btn">{id ? "????????????????" : " ????????????????"}</Button>
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
