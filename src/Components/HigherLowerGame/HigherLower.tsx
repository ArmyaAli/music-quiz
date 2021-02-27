import React, { useEffect, useState } from "react";
import { HigherLowerStyles } from "./HigherLowerStyles";
import MOCK_DATA from "../../data.json";
import axios from "axios";

interface dataType {
  youtubeID: string;
  title: string;
  views: number;
  likes: number;
  dislikes: number;
}

interface Props {
  score: () => void;  
}

const embed = "https://www.youtube.com/embed/";
let count = 0;
export const HigherLower = (props: Props) => {
  const classes = HigherLowerStyles();
  const [currVideo, setVideo] = useState<dataType>(MOCK_DATA["DATA_SET"][count]);

  const digits = Math.floor(Math.log10(currVideo.views)) + 1;
  const firstTwo =
    Math.round(Number(String(currVideo.views).substring(0, 2)) / 10) * 10;
  const presentedViews = (firstTwo / 10) * (10 ** (digits - 1));

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const checkIfCorrect = (input: string): boolean => {
    console.log(currVideo.views, presentedViews);
    if (input === "Higher" && currVideo.views > presentedViews)
    {
      props.score();
      return true;
    }
    else if (input === "Lower" && currVideo.views < presentedViews)
    {
      props.score();
      return true;
    }
    else return false;
  };

  const handleHigherClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Higher"));
    
    setVideo(MOCK_DATA["DATA_SET"][++count]);
  };

  const handleLowerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Lower"));
    setVideo(MOCK_DATA["DATA_SET"][++count]);
  };

  return (
    <div>
      <h2>
        Is this video's view count Higher or Lower than this number:{" "}
        {numberWithCommas(presentedViews)}
      </h2>
      <div className={classes.root}>
        <iframe
          title="video"
          width="560"
          height="315"
          src={embed + currVideo.youtubeID}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* <div className={classes.box}>
        {data?.views}
        {data?.likes}
        {data?.dislikes}
        {data?.title}
        <img
          src={`https://img.youtube.com/vi/${data?.youtubeID}/hqdefault.jpg`}
          alt={data?.title}
          width="560"
          height="315"
        />
      </div> */}
      <div className={classes.buttonContainer}>
        <button onClick={handleHigherClick}>Higher</button>
        <button onClick={handleLowerClick}>Lower</button>
      </div>
    </div>
  );
};
