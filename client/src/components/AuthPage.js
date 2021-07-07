import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import useReq from "../hooks/req.hook";
import { AuthContext } from "../context/AuthContext";
import { createHash } from "../utils/password";

/**
 * Render auth form.
 * Holds following states:
 * showPass - hide/show password;
 * isRegister - to determine is component uses for login or register;
 * authData - form's state.
 * Sets userId cookie, when user log in or register.
 * @returns Auth form.
 */
const AuthPage = () => {
  const [, setUserIdCookie] = useCookies(["userId"]);
  const { setUserId, setIsAuthenticated } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [makeQuery, , { loading, error, setError }] = useReq();

  useEffect(() => {
    clearTimeout(timerId);
    let timerId = setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: Подумать, как сделать лучше
  const handleSubmit = (e) => {
    e.preventDefault();
    let query;
    let callback;

    if (!authData.email || !authData.password) {
      setError("Заполните все поля!");
      return;
    }

    let register = () => {
      let newHash = createHash(authData.password);
      query = `mutation {
        registerUser(email: "${authData.email}", password: "${newHash}") {
          id
        }
      }`;

      callback = (res) => {
        let data = res.data.registerUser;
        if (data) {
          setUserId(data.id);
          setUserIdCookie("userId", data.id, { path: "/" });
          setIsAuthenticated(true);
        }
      };

      makeQuery(query, callback);
    };

    let login = () => {
      query = `query {
      login(email: "${authData.email}", password: "${createHash(
        authData.password
      )}") {
        id
      }
    }`;

      callback = (res) => {
        let data = res.data.login;
        if (data) {
          setUserId(data.id);
          setUserIdCookie("userId", data.id, { path: "/" });
          setIsAuthenticated(true);
        }
      };

      makeQuery(query, callback);
    };

    if (isRegister) register();
    else login();
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
                {error ? error[0].message ?? error : "Что-то пошло не так!"}
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
              <label>
                <input
                  onChange={(e) => setShowPass(e.target.checked)}
                  checked={showPass}
                  type="checkbox"
                />{" "}
                Показать пароль
              </label>
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
