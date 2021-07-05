import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./styles/index.sass";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";

/**
 * Provides basic routing. Determines if the user is authorised with "userId" cookie.
 * Holds following states:
 * userId
 * isAuthenticated
 * @returns basic routing.
 */
const App = () => {
  const [cookies] = useCookies(["userId"]);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.userId) {
      setUserId(cookies.userId);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, isAuthenticated, setIsAuthenticated }}
    >
      <Router>{useRoutes(isAuthenticated)}</Router>
    </AuthContext.Provider>
  );
};

export default App;
