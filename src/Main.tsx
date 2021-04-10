import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HigherLower } from "./Components/HigherLowerGame/HigherLower";
import { HomePage } from "./Pages/HomePage";
import { QuestionsPage } from "./Pages/QuestionPage";
import { ResultsPage } from "./Pages/ResultsPage";

function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/questionsPage">
            <QuestionsPage />
          </Route>
          <Route path="/resultsPage">
            <ResultsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Main;
