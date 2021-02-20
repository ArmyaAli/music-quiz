import React, { useEffect, useState } from "react";
import { HigherLowerStyles } from "./HigherLowerStyles";
import axios from "axios";
import data from "../../../Testing/data.json";

const embed = "https://www.youtube.com/embed/";

interface dataType {
  youtubeID: string;
  title: string;
  views: number;
  likes: number;
  dislikes: number;
}

function loadData() {
  return data;
}

export const HigherLower = () => {
  const classes = HigherLowerStyles();
  const [data, setData] = useState<dataType | null>(null);
  useEffect(() => {
    console.log("mounted");
    // fetch some data
    // populate our componenet state
    console.log(loadData());
    setData(loadData());

    return () => console.log("unmounting...");
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <iframe
          width="560"
          height="315"
          src={embed + data?.youtubeID}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <iframe
          width="560"
          height="315"
          src={embed + data?.youtubeID}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className={classes.box}>
        {data?.views}
        {data?.likes}
        {data?.dislikes}
        {data?.title}
        <img src={`https://img.youtube.com/vi/${data?.youtubeID}/hqdefault.jpg`} alt="Girl in a jacket" width="560" height="315" />
      </div>
    </div>
  );
};
