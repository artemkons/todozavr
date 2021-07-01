import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.sass";
import { useRoutes } from "./routes";

/**
 * Provides basic routing.
 * @returns basic routing.
 */
const App = () => {
  return <Router>{useRoutes()}</Router>;
};

export default App;
