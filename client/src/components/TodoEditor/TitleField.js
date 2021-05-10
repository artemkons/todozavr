import React from "react";

const TitleField = ({ name, onChange, value, error }) => {
  return (
    <div className="todo-editor__title-container">
      <input
        name={name}
        type="text"
        onChange={onChange}
        value={value}
        className={
          "todo-editor__input " +
          (error ? "todo-editor__input_error " : "") +
          "todo-editor__title-container__input"
        }
        autoFocus
      ></input>
      <div
        className={
          error
            ? "todo-editor__title-container__error-field_active"
            : "todo-editor__title-container__error-field"
        }
      >
        {error ? error : "Упс..."}
      </div>
    </div>
  );
};

export default TitleField;
