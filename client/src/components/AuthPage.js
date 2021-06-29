import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Render auth form.
 * @returns Auth form.
 */
const AuthPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="wrapper">
      <form className="auth__form">
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
        <button className="btn">Войти</button>
      </form>
    </div>
  );
};

export default AuthPage;
