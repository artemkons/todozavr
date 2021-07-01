import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import AuthPage from "./components/AuthPage";

/**
 * Returns routing depending on authentication. 
 * Holds isAuthenticated state.
 * @param {boolean} isAuthenticated
 * @returns routing
 */
export const useRoutes = () => {
  const [todos, setTodos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/">
          <TodoList todos={todos} setTodos={setTodos} />
        </Route>
        <Route path={["/item/:id", "/new"]}>
          <TodoEditor todos={todos} />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <AuthPage setIsAuthenticated={setIsAuthenticated} />
      </Route>
    </Switch>
  );
};
