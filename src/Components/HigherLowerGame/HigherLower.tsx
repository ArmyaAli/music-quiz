import React, { useEffect, useState } from "react";
import { gameModeProps, dataType } from "../../Util/dataSchema";
import "./higherlower.css";
import axios from "axios";

import MOCK_DATA from "../../data.json";
import { Divider } from "@material-ui/core";

const embed = "https://www.youtube.com/embed/";
let count = 0;

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
    console.log(data, currVideo1, currVideo2)
    roundedViews1 = rounding(currVideo1!.views);
    roundedViews2 = rounding(currVideo2!.views);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://ikengo.net/Projects/highlow/getrandomsong"
        );
        console.log(response.data);
        setData(response.data["DATA_SET"]);
        setVideo1(response.data["DATA_SET"][count]);
        setVideo2(response.data["DATA_SET"][count + 1]);
        setIsLoading(false);
      } catch (err) {
        console.error(`Error occured:${err}`);
      }
    };
    getData();

    //   setData(MOCK_DATA["DATA_SET"]);
    //   setVideo1(MOCK_DATA["DATA_SET"][count]);
    //   setVideo2(MOCK_DATA["DATA_SET"][count + 1]);
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
    if (data) {
      setVideo1(data[++count]);
      setVideo2(data[count + 1]);
    }
  };

  const handleLowerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect("Lower"));
    if (data) {
      setVideo1(data[++count]);
      setVideo2(data[count + 1]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto text-6xl">
            <img src="../../loading.gif" alt="loading..."/>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="flex flex-col h-full">
        <div className="mx-auto flex justify-center h-full my-8 w-full">
          <div className="w-2/5">
            <div className="text-center text-2xl italic font-extrabold mb-8 text-yellow-300">
              {currVideo1?.title}
            </div>
            <iframe
              className="mx-auto w-3/5 md:w-3/6 my-4"
              title="video"
              height="250"
              width="400"
              src={embed + currVideo1?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="text-center text-2xl italic font-extrabold mb-8 text-yellow-300">
              {numberWithCommas(roundedViews1)}
            </div>
          </div>
          <div className="w-2/5">
            <div className="text-center text-2xl italic font-extrabold mb-8 text-yellow-300">
              {currVideo2?.title}
            </div>
            <iframe
              className="mx-auto w-3/5 md:w-3/6 my-4"
              title="video"
              height="250"
              width="400"
              src={embed + currVideo2?.youtubeID}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center text-2xl font-extrabold mb-8 text-black-300">
          {currVideo2?.title} has
        </div>

        <div className="mx-auto flex">
          <button
            className="p-4 border border-green-500 bg-green-300 hover:bg-green-400 hover:text-white text-green-100 mx-4 w-24 text-center rounded"
            onClick={handleHigherClick}
          >
            Higher
          </button>
          <div className="text-center text-2xl font-extrabblack mb-8 text-black-300"> OR </div>
          <button
            className="p-4 border rounded border-red-500 text-black bg-red-300 hover:bg-red-400 text-red-100 mx-4 w-24 text-center rounded"
            onClick={handleLowerClick}
          >
            Lower
          </button>
        </div>
        <div className="text-center text-2xl font-medium mb-8 text-black-300">
          views than {currVideo1?.title}
        </div>
      </div>
    </div>
  );
};
