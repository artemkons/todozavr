import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";

/**
 * Render auth form.
 * @returns Auth form.
 */
const AuthPage = () => {
  return (
    <div className="wrapper">
      <form className="auth__form">
        <p className="control has-icons-left">
          <input class="input is-primary" type="login" placeholder="Email" />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faAt} />
          </span>
        </p>
        <p className="control has-icons-left">
          <input
            class="input is-primary"
            type="password"
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faKey} />
          </span>
        </p>
        <button className="btn">Войти</button>
      </form>
    </div>
  );
};

export default AuthPage;
