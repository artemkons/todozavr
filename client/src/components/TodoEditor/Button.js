import React from "react";

//TODO:  Возможно это мне и не нужно
const Button = ({ type }) => {
  return (
    <button className="btn" type={type}>
      Добавить
    </button>
  );
};

export default Button;
