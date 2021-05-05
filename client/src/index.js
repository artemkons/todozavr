import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.sass";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";

render(
  <Router>
    <Switch>
      <Route exact path="/">
        <TodoList />
      </Route>
      <Route path="/item/:id">
        <TodoEditor />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
