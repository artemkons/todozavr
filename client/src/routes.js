import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import AuthPage from "./components/AuthPage";

/**
 * Returns routing depending on authentication.
 * @param {boolean} isAuthenticated
 * @returns routing
 */
export const useRoutes = (isAuthenticated) => {
  const [todos, setTodos] = useState([]);

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
        <AuthPage />
      </Route>
    </Switch>
  );
};
