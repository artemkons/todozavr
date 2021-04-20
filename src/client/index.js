import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

render(
  <Router>
    <Link to="/test">test</Link>
    <Switch>
      <Route exact path="/">
        <h1>MAINs</h1>
      </Route>
      <Route path="/test">
        <h1>Redactor whaat</h1>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
