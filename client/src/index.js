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
      {/*  TODO: подумать, как лучше чтобы не передавать столько параметров */}
      <Route path={["/item/:id/:title/:text", "/new"]}>
        <TodoEditor />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
