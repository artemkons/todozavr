import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Button from "./Button";
import useReq from "../../hooks/req.hook";

const TodoEditor = () => {
  let { id, title, text } = useParams();
  const [value, setValue] = useState({
    title: title ? title : "",
    text: text ? text : "",
  });
  const [loading, error, response, makeQuery, setError, setLoading] = useReq();

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
      addTodo(title:"${value.title}", text:"${value.text}") {
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

  if (loading)
    // FIXME: вынеси меня в отдельный комп.
    return (
      <div className="wrapper_loading">
        <h1>Loading...</h1>
      </div>
    );

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
          <TextField
            name="text"
            onChange={handleChange}
            value={value.text}
            error={error}
          />
          <Button type="submit" id={id} />
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
