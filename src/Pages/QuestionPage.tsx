import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { HigherLower } from "../Components/HigherLowerGame/HigherLower";

const possibleRoutes = [];

export const QuestionsPage = () => {
  let { path, url } = useRouteMatch();
  const [score, setScore] = useState<number>(0);

  const updateScore = (): void => {
    setScore(score + 1);
  };

  return (
    <div>
      <h2>Score: {score}</h2>
      <Link to={`${url}/higherlower`}>Rendering with React</Link>
      <hr />
      <Switch>
        <Route exact path={path}></Route>
        <Route path={`${path}/:gametype`}>
          <HigherLower score={updateScore} />
        </Route>
      </Switch>
    </div>
  );
};
