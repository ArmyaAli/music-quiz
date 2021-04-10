import React, { useCallback } from "react";
import { useHistory } from "react-router";
import { stateManagement } from "./common";
import "./styles/results.css";

export const ResultsPage = () => {
  let history = useHistory();

  const handleGoAgane = () => {
    history.push("questionsPage/higherlower");
  };

  const handleLeaderboards = () => {
    history.push("questionsPage/higherlower/Leaderboards");
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div
        className="center"
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${"../../results.gif"}) repeat center center / cover`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "repeat-y",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1
        }}
      ></div>
      <div className="score p-32 text-center text-white">
        Your score is
      </div>
      <div className="text-center text-white text-9xl">
        {stateManagement.GLOBAL_SCORE}
      </div>
      <div className="flex items-center justify-center h-screen pb-32">
        <button
          className="p-4 brder h-36 border-red-500 bg-red-300 hover:bg-red-400 hover:text-white font-extrabold text-red-100 mx-4 w-40 text-center rounded text-lg md:w-96 md:text-3xl"
          onClick={handleGoAgane}
        >
          Go Agane
        </button>
        <button
          className="p-4 border h-36 border-blue-500 bg-blue-300 hover:bg-red-400 hover:text-white font-extrabold text-red-100 mx-4 w-40 text-center rounded text-lg md:w-96 md:text-3xl"
          onClick={handleLeaderboards}
        >
          Leaderboards
        </button>
      </div>
    </div>
  );
};
