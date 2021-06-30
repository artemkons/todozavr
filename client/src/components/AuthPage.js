import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useReq from "../hooks/req.hook";

/**
 * Render auth form.
 * @returns Auth form.
 */
const AuthPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  // TODO: Всё ли достал что надо?
  const [makeQuery, , { error }] = useReq();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let query = `
    query {
      login(email: "${authData.email}", password: "${authData.password}") {
        id
      }
    }
    `;

    if (isRegister)
      query = `mutation {
      registerUser(email: "${authData.email}", password: "${authData.password}") {
        id
      }
    }`;

    makeQuery(query);
  };

  return (
    <div className="wrapper">
      <div className="tabs is-medium is-centered">
        <ul>
          <li className={isRegister ? "" : "is-active"}>
            <a onClick={() => setIsRegister(false)}>Вход</a>
          </li>
          <li className={isRegister ? "is-active" : ""}>
            <a onClick={() => setIsRegister(true)}>Регистрация</a>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="auth__form">
        <p className="control has-icons-left">
          <input
            onChange={handleChange}
            value={authData.email}
            name="email"
            className="input is-primary"
            type="login"
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faAt} />
          </span>
        </p>
        <p className="control has-icons-left has-icons-right">
          <input
            onChange={handleChange}
            value={authData.password}
            name="password"
            className="input is-primary"
            type={showPass ? "text" : "password"}
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faKey} />
          </span>
          <span className="icon is-small is-right">
            <FontAwesomeIcon icon={showPass ? faEye : faEyeSlash} />
          </span>
          <input
            onChange={(e) => setShowPass(e.target.checked)}
            checked={showPass}
            type="checkbox"
          />{" "}
          Показать пароль
        </p>
        <button className="btn">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
