import React, { useEffect, useState } from "react";
import { gameModeProps, dataType } from "../../Util/dataSchema";
import "./higherlower.css";
import axios from "axios";
import CountUp from "react-countup";

import MOCK_DATA from "../../data.json";
import { Divider } from "@material-ui/core";


const embed = "https://www.youtube.com/embed/";
let count = 0;
let thumbnail1: string
let thumbnail2: string

const rounding = (x: number): number => {
  const digits = Math.floor(Math.log10(x) + 1);
  const firstTwo = Math.round(Number(String(digits).substring(0, 2)) / 10) * 10;
  const rounded = (firstTwo / 10) * 10 ** (digits - 1);
  return rounded;
};

export const HigherLower = (props: gameModeProps) => {
  const [data, setData] = useState<dataType[] | undefined>(undefined);
  const [currVideo1, setVideo1] = useState<dataType | null>(null);
  const [currVideo2, setVideo2] = useState<dataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let roundedViews1 = 0;
  let roundedViews2 = 0;

  if (!isLoading) {
    console.log(data, currVideo1, currVideo2);
    roundedViews1 = rounding(currVideo1!.views);
    roundedViews2 = rounding(currVideo2!.views);
    thumbnail1 = `https://img.youtube.com/vi/${currVideo1?.youtubeID}/hqdefault.jpg`;
    thumbnail2 = `https://img.youtube.com/vi/${currVideo2?.youtubeID}/hqdefault.jpg`;
  }


  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://ikengo.net/Projects/highlow/getrandomsong"
    //     );
    //     console.log(response.data);
    //     setData(response.data["DATA_SET"]);
    //     setVideo1(response.data["DATA_SET"][count]);
    //     setVideo2(response.data["DATA_SET"][count + 1]);
    //     setIsLoading(false);
    //   } catch (err) {
    //     console.error(`Error occured:${err}`);
    //   }
    // };
    // getData();

    setData(MOCK_DATA["DATA_SET"]);
    setVideo1(MOCK_DATA["DATA_SET"][count]);
    setVideo2(MOCK_DATA["DATA_SET"][count + 1]);
    setIsLoading(false);
  }, []);

  const checkIfCorrect = (input: string): boolean => {
    console.log(roundedViews1, roundedViews2);
    if (input === "Higher" && roundedViews2 > roundedViews1) {
      props.score();
      return true;
    } else if (input === "Lower" && roundedViews1 > roundedViews2) {
      props.score();
      return true;
    } else if (roundedViews1 === roundedViews2) {
      props.score();
      return true;
    } else return false;
  };

  const handleHigherClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Higher"));
    loadVideos();
  };

  const handleLowerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Lower"));
    loadVideos();
  };

  const loadVideos = () => // put in next video
  {

    if (data) {
      setVideo1(data[++count]);
      setVideo2(data[count + 1]);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen ">
        <div className="m-auto text-6xl">
          <img src="../../loading.gif" alt="loading..." />
        </div>
      </div>
    );
  }

  return (
    <div className="game-container h-screen">
      <div id="leftHalf" style={{background: `url(${thumbnail1}) no-repeat center center / cover`}} ></div>
      <div className="rightHalf" style={{background: `url(${thumbnail2}) no-repeat center center / cover`}} ></div>
      <div className="flex flex-col h-full">
        <div className="mx-auto flex justify-center my-8 w-full py-52 ">
          <div className="h-1/5 w-2/5">
            <div className="text-center text-2xl italic font-extrabold mb-8 text-purple-300">
              {currVideo1?.title}
            </div>
            <iframe
              className="mx-auto w-3/5 md:w-3/6 my-4"
              title="video"
              style={{border: `3px solid #c4b5fc`, borderRadius: `30px`}}
              height="250"
              width="400"
              src={embed + currVideo1?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="text-center text-2xl italic font-extrabold mb-8 text-white">
            <CountUp 
                end={roundedViews1} 
                duration={1}
                separator = ","
              />
            </div>
          </div>
          <div className="w-2/5">
            <div className="text-center text-2xl italic font-extrabold mb-8 text-yellow-300">
              {currVideo2?.title}
            </div>
            <iframe
              className="mx-auto w-3/5 md:w-3/6 my-4"
              title="video"
              style={{border: `3px solid #fcd34d`, borderRadius: `30px`}}
              height="250"
              width="400"
              src={embed + currVideo2?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="text-center text-2xl italic font-extrabold mb-8 text-white">
            <CountUp 
                end={roundedViews2} 
                duration={1}
                separator = ","
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center text-2xl font-medium text-yellow-300">
            {currVideo2?.title}{" "}
            <span className="text-gray-300 text-1xl font-extrabold">has</span>
          </div>
          <div className="mx-auto my-4 flex">
            <button
              className="p-4 border border-green-500 bg-green-300 hover:bg-green-400 hover:text-white font-extrabold text-green-100 mx-4 w-48 text-center rounded text-3xl"
              onClick={handleHigherClick}
            >
              Higher ↑
            </button>
            <span className="flex justify-center items-center text-1xl font-extrablack text-white">
              OR
            </span>
            <button
              className="p-4 border border-red-500 bg-red-300 hover:bg-red-400 text-red-100  font-extrabold mx-4  w-48 text-center rounded text-3xl bold"
              onClick={handleLowerClick}
            >
              ↓ Lower
            </button>
          </div>
          <div className="text-center text-2xl font-medium text-purple-300">
            <span className="text-gray-300 text-1xl font-extrabold"> views than </span> {currVideo1?.title}
          </div>
        </div>
      </div>
    </div>
  );
};
