import React from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="m-auto ">
        <Link to="/questionsPage">
          <button className="w-64 h-32 bg-green-400 rounded hover:bg-green-500 text-white text-3xl">
            Play Game
          </button>
        </Link>
      </div>
    </div>
  );
};
