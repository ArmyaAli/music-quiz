import React, { useEffect, useState } from "react";
import { gameModeProps, dataType } from "../../Util/dataSchema";
import "./higherlower.css";
import axios from "axios";

import MOCK_DATA from "../../data.json";

const embed = "https://www.youtube.com/embed/";
let count = 0;

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const HigherLower = (props: gameModeProps) => {
  const [data, setData] = useState<dataType[] | null>(null);
  const [currVideo, setVideo] = useState<dataType | null>(null);
  const [digits, setDigits] = useState<number>(0);
  const [firstTwo, setfirstTwo] = useState<number>(0);
  const [presentedViews, setPresentedViews] = useState<number>(0);
  const [ID, setID] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await axios.get(
        //   "https://ikengo.net/Projects/highlow/getrandomsong"
        // );
        setData(MOCK_DATA["DATA_SET"]);
        if (data) {
          setVideo(data[count] as dataType);
          if (currVideo) {
            setDigits(Math.floor(Math.log10(currVideo.views)) + 1);
            setfirstTwo(
              Math.round(Number(String(currVideo.views).substring(0, 2)) / 10) *
                10
            );
            setPresentedViews((firstTwo / 10) * 10 ** (digits - 1));
          }
          setID(currVideo!.youtubeID);
        }
      } catch (err) {
        console.error(`Error occured:${err}`);
      }
    };
    getData();
  }, [currVideo, data, digits, firstTwo, ID]);

  const checkIfCorrect = (input: string): boolean => {
    if (currVideo) {
      console.log(currVideo.views, presentedViews);
      if (input === "Higher" && currVideo.views > presentedViews) {
        props.score();
        return true;
      } else if (input === "Lower" && currVideo.views < presentedViews) {
        props.score();
        return true;
      } else return false;
    } else return false;
  };

  const handleHigherClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Higher"));
    if (data) {
      setVideo(data[++count]);
    }
  };

  const handleLowerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Lower"));
    if (data) {
      setVideo(data[++count]);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col my-40">
        <div className="mx-auto my-8 w-full">
          <h2 className="text-center text-2xl mb-8">
            Is this video's view count Higher or Lower than this number
          </h2>
          <div className="text-center text-3xl italic font-extrabold mb-8 text-yellow-300">
            {numberWithCommas(presentedViews)}
            {/* {numberWithCommas(28540000)} */}
          </div>
          <iframe
            className="mx-auto w-3/5 md:w-3/6"
            title="video"
            height="315"
            width="560"
            src={embed + ID}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mx-auto flex">
          <button
            className="p-4 border rounded border-green-500 text-black bg-green-300 hover:bg-green-400 hover:text-white text-green-100 mx-4 w-24 text-center rounded"
            onClick={handleHigherClick}
          >
            Higher
          </button>
          <button
            className="p-4 border rounded border-red-500 text-black bg-red-300 hover:bg-red-400 text-red-100 mx-4 w-24 text-center rounded"
            onClick={handleLowerClick}
          >
            Lower
          </button>
        </div>
      </div>
    </div>
  );
};
