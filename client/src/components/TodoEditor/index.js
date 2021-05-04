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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    e.preventDefault();

    setLoading(true);
    setError(null);

    if (value.title === "") {
      setError("Введите титульник!");
      setLoading(false);
      return;
    }

    try {
      let response = await fetch("api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
      });

      let result = await response.json();
      setValue({
        title: "",
        text: "",
      });
    } catch (error) {
      setError("Что-то пошло не так, попробуйте позже!");
    }

    setLoading(false);
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="wrapper">
      <div className="todoEditor-container">
        <Link to="/" className="btn">
          Назад
        </Link>
        <form onSubmit={handleSubmit} className="form_container">
          <TitleField
            name="title"
            onChange={handleChange}
            value={value.title}
            error={error}
          />
          <TextField name="text" onChange={handleChange} value={value.text} />
          <Button type="submit" />
        </form>
      </div>
    </div>
  );
};

export default TodoEditor;
