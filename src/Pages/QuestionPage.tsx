import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { HigherLower } from "../Components/HigherLowerGame/HigherLower";
import { Thumbnails } from "../Components/ThumbnailGame/Thumbnails";

const possibleRoutes: string[] = ["/higherlower", /*"/thumbnail"*/];
const randomNum = Math.floor(Math.random() * possibleRoutes.length);

export const QuestionsPage = () => {
  let { path, url } = useRouteMatch();
  const [score, setScore] = useState<number>(0);

  const updateScore = (): void => {
    setScore(score + 1);
  };

  return (
    <div className="">
      <div className="p-4 w-full h-16 flex items-center justify-between">
        <Link to={`${url}${possibleRoutes[0]}`}>
          <button className="p-4 border rounded border-green-500 bg-green-300 hover:bg-green-400 text-white">
            Start Game
          </button>
        </Link>
        <span className="text-3xl">Score: {score}</span>
      </div>
      <hr />
      <Switch>
        <Route exact path={path}></Route>
        <Route path={`${path}/higherlower`}>
          <HigherLower score={updateScore} />
        </Route>
        <Route path={`${path}/thumbnails`}>
          <Thumbnails score={updateScore} />
        </Route>
      </Switch>
    </div>
  );
};
