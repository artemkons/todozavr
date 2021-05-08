import React from "react";

//TODO:  Возможно это мне и не нужно, id передавать тоже ни к чему
const Button = ({ type, id }) => {
  return (
    <button className="btn" type={type}>
      {id ? "Изменить" : " Добавить"}
    </button>
  );
};

export default Button;
