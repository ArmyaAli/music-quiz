import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      Home Page
      <button>
        <Link to="/questionsPage">
          Play Game
        </Link>
      </button>
    </div>
  );
};
