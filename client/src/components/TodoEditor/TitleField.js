import React from "react";

const TitleField = ({ name, onChange, value }) => {
  return (
    <input
      name={name}
      type="text"
      onChange={onChange}
      value={value}
      className="form-input todo-title"
    ></input>
  );
};

export default TitleField;
