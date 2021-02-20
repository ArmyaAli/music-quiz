import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { HigherLower } from "../Components/HigherLower/HigherLower";

const score = 100;
const possibleRoutes = [];

export const QuestionsPage = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h2>Score: {score}</h2>
      <Link to={`${url}/higherlower`}>Rendering with React</Link>
      <hr />
      <Switch>
        <Route exact path={path}></Route>
        <Route path={`${path}/:gametype`}>
          <HigherLower />
        </Route>
      </Switch>
    </div>
  );
};
