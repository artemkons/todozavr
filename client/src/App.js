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

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      <Router>{useRoutes()}</Router>;
    </AuthContext.Provider>
  );
};

export default App;
