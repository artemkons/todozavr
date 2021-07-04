import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useReq from "../hooks/req.hook";
import { AuthContext } from "../context/AuthContext";

/**
 * FIXME:
 * Render auth form.
 * Holds following states:
 * showPass - hide/show password;
 * isRegister - to determine is component uses for login or register.
 * Sets isAuthenticated state.
 * @returns Auth form.
 */
const AuthPage = () => {
  // TODO: User id нужен?
  const { userId, setUserId, setIsAuthenticated } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  // TODO: Всё ли достал что надо?
  const [makeQuery, , { loading, error }] = useReq();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: Стоит переписать отдельно под регистрацию и под логин
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

    let loginCallback = (response) => {
      let data = response.data;
      if (data.login || data.registerUser) setIsAuthenticated(true);
      setUserId(data.login ? data.login.id : data.registerUser.id);
    };

    makeQuery(query, loginCallback);
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
        <div className="field">
          <div
            className={`control has-icons-left ${loading ? "is-loading" : ""}`}
          >
            <label>
              <input
                onChange={handleChange}
                value={authData.email}
                name="email"
                className={`input is-primary ${error ? "is-danger" : ""}`}
                type="login"
                placeholder="Email"
              />
              <p className={`help is-danger ${error ? "" : "disabled"}`}>
                {error ? error[0].message : "Что-то пошло не так!"}
              </p>
            </label>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faAt} />
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left has-icons-right">
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
            <div className="field">
              <input
                onChange={(e) => setShowPass(e.target.checked)}
                checked={showPass}
                type="checkbox"
              />{" "}
              Показать пароль
            </div>
          </div>
        </div>
        <div className="field">
          <button className="btn">
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
