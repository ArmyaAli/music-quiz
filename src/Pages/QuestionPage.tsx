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

// const possibleRoutes = [];

export const QuestionsPage = () => {
  let { path, url } = useRouteMatch();
  const [score, setScore] = useState<number>(0);

  const updateScore = (): void => {
    setScore(score + 1);
  };

  return (
    <div className="bg-"> 
      <div className="p-4 w-full h-16 flex items-center justify-between">
        <Link to={`${url}/higherlower`}>
          <button className="p-4 border rounded border-green-500 bg-green-300 text-black hover:bg-green-400 text-white">Start Game</button>
        </Link>
        <span className="text-3xl">Score: {score}</span>
      </div>
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
