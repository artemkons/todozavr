import React from "react";

const TitleField = ({ name, onChange, value, error }) => {
  return (
    <div className="todo-title-container">
      <input
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        className="form-input todo-title"
      ></input>
      <div className={error ? "error-field-active" : "error-field"}>
        {error ? error: "Упс..."}
      </div>
    </div>
  );
};

export default TitleField;
