import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Loading from "../Loading";
import useReq from "../../hooks/req.hook";
import Calendar from "react-calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bulma-components";
import "react-calendar/dist/Calendar.css";
import "./styles/date.sass";

/**
 * Creates a todo editor window.
 * @returns Todo editor window.
 */
const TodoEditor = () => {
  let { id, title, text } = useParams();
  const [value, setValue] = useState({
    title: title ? title : "",
    text: text ? text : "",
  });
  const { loading, error, makeQuery, setError, setLoading } = useReq();
  // FIXME: Занести мб в value?
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("00:00");

  const [isModalActive, setIsModalActive] = useState(false);

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

    let deadline = date;
    let [hours, minutes] = time.split(":");
    deadline.setHours(hours);
    deadline.setMinutes(minutes);

    console.log(deadline);
    let newTodoQuery = `
    mutation {
      addTodo(title:"${value.title}", text:"${value.text}", deadline:"${deadline}") {
        id
      }
    }
    `;

    let editTodoQuery = `
    mutation {
      editTodo(id:"${id}", title:"${value.title}", text:"${value.text}") {
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

  if (loading) return <Loading />;

  let handleTime = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="todo-editor">
        <Link to="/" className="btn">
          Назад
        </Link>
        <form onSubmit={handleSubmit} className="todo-editor__form">
          <TitleField
            name="title"
            onChange={handleChange}
            value={value.title}
            error={error}
          />
          {/* Date input block */}
          <div className="date-input">
            <input type="time" value={time} onChange={handleTime} />
            <Button
              onClick={() => setIsModalActive(true)}
              size="small"
              type="button"
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
            </Button>
            <Modal show={isModalActive} onClose={() => setIsModalActive(false)}>
              <Modal.Content>
                <Calendar
                  minDate={new Date()}
                  onChange={setDate}
                  value={date}
                />
              </Modal.Content>
            </Modal>
          </div>
          {/* Date input block ends */}
          <TextField
            name="text"
            onChange={handleChange}
            value={value.text}
            error={error}
          />
          <button className="btn">{id ? "Изменить" : " Добавить"}</button>
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
