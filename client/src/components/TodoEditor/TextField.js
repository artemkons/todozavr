import React from "react";

const TextField = ({ name, onChange, value }) => {
  return (
    <textarea
      name={name}
      onChange={onChange}
      value={value}
      className="form-input todo-text"
    ></textarea>
  );
};

export default TextField;
