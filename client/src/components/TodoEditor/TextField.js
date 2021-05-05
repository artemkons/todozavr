import React from "react";

const TextField = ({ name, onChange, value, error }) => {
  return (
    <textarea
      name={name}
      onChange={onChange}
      value={value}
      className={
        "todo-editor__input " +
        (error ? "todo-editor__input_error " : "") +
        "todo-editor__text"
      }
    ></textarea>
  );
};

export default TextField;
