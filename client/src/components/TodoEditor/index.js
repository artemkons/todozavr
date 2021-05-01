import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Button from "./Button";

const TodoEditor = () => {
  let { id } = useParams();
  const [value, setValue] = useState({
    title: "",
    text: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const target = e.target;

    setValue((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    let query = `
    mutation {
      addTodo(title:"${value.title}", text:"${value.text}") {
        title
      }
    }
    `;
    console.log(query);
    e.preventDefault();

    // TODO: Попробовать таки вынести функцию эту
    let response = await fetch("http://localhost:3000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query }),
    });

    let result = await response.json();
    console.log(result);
    setValue({
      title: "",
      text: "",
    });
  };

  // TODO:  Реализовать добавление тудушки
  return (
    <div className="wrapper">
      <div className="todoEditor-container">
        <h1>ID: {id}</h1>
        <Link to="/" className="btn">
          Назаl
        </Link>
        <form onSubmit={handleSubmit} className="form_container">
          <TitleField
            name="title"
            onChange={handleChange}
            value={value.title}
          />
          <TextField name="text" onChange={handleChange} value={value.text} />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
