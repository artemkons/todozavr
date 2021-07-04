import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.sass";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";

/**
 * Provides basic routing.
 * @returns basic routing.
 */
const App = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ userId, setUserId, isAuthenticated, setIsAuthenticated }}
    >
      <Router>{useRoutes(isAuthenticated)}</Router>;
    </AuthContext.Provider>
  );
};

export default App;
