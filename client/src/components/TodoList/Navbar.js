import React, { useContext } from "react";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [, , removeCookie] = useCookies(["userId"]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    removeCookie("userId", {
      path: "/",
    });
  };

  return (
    <nav className="navbar is-primary">
      <div className="navbar-menu mobile">
        <div className="navbar-brand">
          <h3 className="navbar-item">TODOZAVR</h3>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={handleLogout}
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
    </nav>
  );
};

export default Navbar;
