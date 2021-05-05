import React from "react";

const TextField = ({ name, onChange, value }) => {
  return (
    <textarea
      name={name}
      onChange={onChange}
      value={value}
      className="todo-editor__input todo-editor__text"
    ></textarea>
  );
};

export default TextField;
