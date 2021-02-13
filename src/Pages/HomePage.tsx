import React, { useState } from "react";
import runSample from "../Util/search";

export const HomePage = () => {
  const [query, setQuery] = useState<string>(" ")

  const clickHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await runSample(query);
    } catch (err) {
      console.log(`Error occured: ${err}`);
    }
  };

  const keyPressHandler = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    try {
      setQuery(event.currentTarget.value)
      if (event.key==='Enter'){
        await runSample(query);
      }
    } catch (err) {
      console.log(`Error occured: ${err}`);
    }
  };

  return (
    <div>
      <input type="text" onKeyPress={keyPressHandler} />
      <button onClick={clickHandler}>Home Page</button>
    </div>
  );
};
