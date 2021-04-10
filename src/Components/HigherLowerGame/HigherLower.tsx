import React, { useLayoutEffect, useState } from "react";
import dataSet from "../../data.json"
import { gameModeProps, dataType } from "../../Util/dataSchema";
import "./higherlower.css";
import axios from "axios";
import CountUp from "react-countup";
import { Router, useHistory } from "react-router";

const embed = "https://www.youtube.com/embed/";
let thumbnail1: string;
let thumbnail2: string;

const rounding = (x: number): number => {
  const digits = Math.floor(Math.log10(x) + 1);
  const secondThird = Math.round(Number(String(x).substring(1, 3)) / 10) * 10;
  const rounded = Number(String(x).substring(0, 1)) * 10 ** (digits - 1) + (secondThird / 10) * 10 ** (digits - 2);
  return rounded;
};

export const HigherLower = (props: gameModeProps) => {
  const [data, setData] = useState<dataType[] | undefined>(undefined);
  const [currVideo1, setVideo1] = useState<dataType | null>(null);
  const [currVideo2, setVideo2] = useState<dataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewState, setViewState] = useState<boolean>(false); //false = invisible
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const history = useHistory();
  let roundedViews1 = 0;
  let roundedViews2 = 0;

  if (!isLoading) {
    roundedViews1 = rounding(currVideo1!.views);
    roundedViews2 = rounding(currVideo2!.views);
    thumbnail1 = `https://img.youtube.com/vi/${currVideo1?.youtubeID}/hqdefault.jpg`;
    thumbnail2 = `https://img.youtube.com/vi/${currVideo2?.youtubeID}/hqdefault.jpg`;
  }
  
  const getData = async (no: number) => {
    // const data = await axios.get(
    //   `https://ikengo.net/Projects/highlow/getrandomsong/${no}`
    // );
    return dataSet["DATA_SET"];
  };

  useLayoutEffect(() => {
    const init = async () => {
      try {
        const response = await getData(5);
        setData(response);
        setVideo1(response[0]);
        setVideo2(response[1]);
        setIsLoading(false);
      } catch (err) {
        console.error(`Error occured:${err}`);
      }
    };
    init();
  }, []);

  const checkIfCorrect = (input: string): boolean => {
    if (input === "Higher" && roundedViews2 > roundedViews1) {
      props.score();
      return true;
    } else if (input === "Lower" && roundedViews1 > roundedViews2) {
      props.score();
      return true;
    } else if (roundedViews1 === roundedViews2) {
      props.score();
      return true;
    } else {
        history.push('/resultsPage');
        return false;
    }
  };

  const handleHigherClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    checkIfCorrect("Higher");
    loadVideos();
  };

  const handleLowerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    checkIfCorrect("Lower");
    loadVideos();
  };

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadVideos = () =>
    // put in next video
    {
      setIsProcessing(true);
      setViewState(true);
      sleep(1250).then(async () => {
        if (data) {
          const newSong = await getData(1);
          const _data = [...data];
          _data.push(newSong[0]);
          setVideo1(_data.slice(1)[0]);
          setVideo2(_data.slice(1)[1]);
          setData(_data.slice(1));
          setViewState(false);
          setIsProcessing(false);
        }
      });
    };

  if (isLoading) {
    return (
      <div className="flex h-screen ">
        <div className="m-auto text-6xl">
          <img src="../../loading.gif" alt="loading..." />
        </div>
      </div>
    );
  }

  if (isProcessing) {
  }

  return (
    <div className="game-container h-full">
      <div
        className="leftHalf"
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${thumbnail1}) repeat center center / cover`,
        }}
      ></div>
      <div
        className="rightHalf"
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${thumbnail2}) repeat center center / cover`,
        }}
      ></div>
      <div className="flex flex-col h-full">
        <div className="mx-auto flex justify-center my-8 w-full lg:pt-52d">
          <div className="w-3/5">
            <div className="text-center w-full h-16 lg:text-2xl md:text-1x1  italic font-extrabold mb-8 text-purple-300">
              {currVideo1?.title}
            </div>
            <iframe
              className="mx-auto w-4/5 h-28 md:w-3/6 lg:w-4/5 lg:h-96 my-4"
              title="video"
              style={{ border: `3px solid #c4b5fc`, borderRadius: `30px` }}
              width="560"
              height="315"
              src={embed + currVideo1?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div
              className={
                "text-center text-2xl italic font-extrabold mb-8 text-white"
              }
            >
              <CountUp end={roundedViews1} duration={0.75} separator="," /> views
            </div>
          </div>
          <div className="w-3/5">
            <div className="text-center w-full h-16 lg:text-2xl md:text-1x1 italic font-extrabold mb-8 text-yellow-300">
              {currVideo2?.title}
            </div>
            <iframe
              className="mx-auto w-4/5 h-28 md:w-3/6 lg:w-4/5 lg:h-96 my-4"
              title="video"
              style={{ border: `3px solid #fcd34d`, borderRadius: `30px` }}
              width="560"
              height="315"
              src={embed + currVideo2?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div
              className={
                viewState
                  ? "visible text-center text-2xl italic font-extrabold mb-8 text-white"
                  : "invisible"
              }
            >
              <CountUp
                end={roundedViews2}
                duration={0.75}
                separator={viewState ? "," : ""} // change separator to force rerender aka redraw
              />
              {`${viewState ? " views" : ""}`}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center font-medium text-yellow-300">
            {currVideo2?.title}{" "}
            <span className="text-gray-300 text-1xl font-extrabold">has</span>
          </div>
          <div className="mx-auto my-4 flex flex-wrap">
            <button
              className="p-4 border border-green-500 bg-green-300 hover:bg-green-400 hover:text-white font-extrabold text-green-100 mx-4 w-28 text-center rounded text-lg md:w-48 md:text-3xl"
              disabled={isProcessing ? true : false}
              onClick={handleHigherClick}
            >
              Higher ↑
            </button>
            <span className={`flex text-center justify-center items-center md:text-3xl font-extrablack text-white`}>
              { !isProcessing ? `OR` :
              <div className="flex">
                <div className="m-auto text-6xl">
                  <img src="../../loading.gif" alt="loading..." width="40.5667" height="70"/>
                </div>
              </div>}
            </span>
            <button
              className="p-4 border border-red-500 bg-red-300 hover:bg-red-400 hover:text-white font-extrabold text-red-100 mx-4 w-28 text-center rounded text-lg md:w-48 md:text-3xl"
              onClick={handleLowerClick}
            >
              ↓ Lower
            </button>
          </div>
          <div className="text-center text-2xl md:text-1xl font-medium text-purple-300">
            <span className="text-gray-300 text-1xl font-extrabold">
              {" "}
              views than{" "}
            </span>{" "}
            {currVideo1?.title}
          </div>
        </div>
      </div>
    </div>
  );
};
