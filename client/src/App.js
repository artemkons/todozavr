import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.sass";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TodoList />
        </Route>
        <Route path={["/item/:id/:title/:text", "/item/:id/:title/", "/new"]}>
          <TodoEditor />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
