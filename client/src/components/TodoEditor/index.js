import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Loading from "../Loading";
import DataField from "./DataField";
import useReq from "../../hooks/req.hook";

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

    let newTodoQuery = `
    mutation {
      addTodo(title:"${value.title}", text:"${value.text}", deadline:"${date}") {
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
          <DataField onChange={setDate} value={date} />
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
