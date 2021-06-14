import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bulma/bulma.sass";
import "./styles/index.sass";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";

/**
 * Holds todos state. Provides basic routing.
 * @returns basic routing.
 */
const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TodoList todos={todos} setTodos={setTodos} />
        </Route>
        <Route path={["/item/:id", "/new"]}>
          <TodoEditor todos={todos} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
