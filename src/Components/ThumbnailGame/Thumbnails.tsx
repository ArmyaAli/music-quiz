import React, { useEffect, useState } from "react";
import MOCK_DATA from "../../data.json";
import { dataType, gameModeProps } from "../../Util/dataSchema";

let count = 0;

export const ThumbnailsGame = () => {
  const [id, setId] = useState<string>(MOCK_DATA["DATA_SET"][count].youtubeID);
  const URL = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  const checkIfCorrect = () => {};

  const handleAnswerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect());
    setId(MOCK_DATA["DATA_SET"][++count].youtubeID);
  };

  return (
    <div>
      <h2>Name the title of the video the thumbnail is associated with:</h2>
      <div>
        <img
          alt={MOCK_DATA["DATA_SET"][count].title}
          src={URL}
          width="560"
          height="315"
        ></img>
      </div>
      <div>
        <input type="text" id="Answer" />
        <button onClick={handleAnswerClick}>Submit</button>
      </div>
    </div>
  );
};
