import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar is-primary">
      <div className="wrapper">
        <div className="navbar-menu mobile">
          <div className="navbar-start">
            <p className="navbar-item">Добро пожаловать, ящер!</p>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="button is-primary is-rounded is-accent"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
                <span className="is-laptop">Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
