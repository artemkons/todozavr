import React from "react";
import { Link } from "react-router-dom";
import TitleField from "./TitleField";
import TextField from "./TextField";
import Button from "./Button";

const TodoEditor = () => {
  return (
    <div className="wrapper">
      <div className="todoEditor-container">
        <Link to="/" className="btn">
          Назад
        </Link>
        <TitleField />
        <TextField />
        <Button />
      </div>
    </div>
  );
};

export default TodoEditor;
