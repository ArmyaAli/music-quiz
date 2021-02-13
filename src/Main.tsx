import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Main.css";
import { HomePage } from "./Pages/HomePage";

function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
              <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
