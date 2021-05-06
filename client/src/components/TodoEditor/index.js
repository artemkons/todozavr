import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Button from "./Button";
import useReq from "../../hooks/req.hook";

const TodoEditor = () => {
  let { id } = useParams();
  const [value, setValue] = useState({
    title: "",
    text: "",
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

    let query = `
    mutation {
      addTodo(title:"${value.title}", text:"${value.text}") {
        id
      }
    }
    `;

    if (value.title === "") {
      setError("Введите титульник!");
      setLoading(false);
      return;
    }

    makeQuery(query);
    setValue({
      title: "",
      text: "",
    });
  };

  if (loading) return <h3>Loading...</h3>;

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
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
