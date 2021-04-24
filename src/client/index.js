import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/index.css";
// import backArrow from "./styles/back-arrow_icon-icons.com_72866.svg";
import TitleField from "./components/TitleField";
import TextField from "./components/TextField";
import Button from "./components/Button";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";

render(
  <Router>
    <Switch>
      <Route exact path="/">
        <div className="wrapper">
          <TodoList />
        </div>
      </Route>
      <Route exact path="/item">
        <div className="wrapper">
          <TodoEditor />
        </div>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
