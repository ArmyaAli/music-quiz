import axios from "axios";
import React, { useEffect, useState } from "react";
import MOCK_DATA from "../../data.json";
import { dataType, gameModeProps } from "../../Util/dataSchema";

let count = 0;

export const Thumbnails= (props: gameModeProps) => {
  const [data, setData] = useState<dataType[] | null>(null);
  const [currVideo, setVideo] = useState<dataType | null>(MOCK_DATA["DATA_SET"][count]);
  const [ID, setID] = useState<string>(MOCK_DATA["DATA_SET"][count].youtubeID);
  const [answer, setAnswer] = useState<string>("");

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://ikengo.net/Projects/highlow/getrandomsong"
  //       );
  //       setData(response.data);
  //       if (data) {
  //         setVideo(data[0] as dataType);
  //         setID(currVideo!.youtubeID);
  //       }
  //     } catch (err) {
  //       console.error(`Error occured:${err}`);
  //     }
  //   };
  //   getData();
  // }, [currVideo, data, ID]);

  const URL = `https://img.youtube.com/vi/${ID}/hqdefault.jpg`;

  const checkIfCorrect = (input: string): boolean => {
    if (currVideo) {
      console.log(input.toLowerCase().trim())
      console.log(currVideo.title.toLowerCase().trim())
      if (input.toLowerCase().trim() === currVideo.title.toLowerCase().trim()) {
        props.score();
        return true;
      }
    }
    return false;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnswer(event.target.value);
  }


  const handleEnter = (
  event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if(event.key === "Enter")
    {
      console.log(checkIfCorrect(answer))
      setVideo(MOCK_DATA["DATA_SET"][++count])
      setID(MOCK_DATA["DATA_SET"][count].youtubeID)
    }
  }

  const handleAnswerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(checkIfCorrect(answer))
    setVideo(MOCK_DATA["DATA_SET"][++count])
    setID(MOCK_DATA["DATA_SET"][count].youtubeID)
  };

  return (
    <div className="h-4/5 w-full">
      <h2 className="mx-auto text-center my-4  text-2xl font-medium text-yellow-300">Name the title of the video the thumbnail is associated with</h2>
        <img
        className="m-auto"
          alt={MOCK_DATA["DATA_SET"][count].title}
          src={URL}
          width="560"
          height="315"
        ></img>
       <div className="w-96 mx-auto my-4">
        <input 
          className="border-solid border-2 rounded bg-gray-200 p-2 mx-4"
          type="text" 
          id="answer"
          value={answer}
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
        <button className="p-4 border rounded border-green-500 bg-green-300 hover:bg-green-400 text-white" onClick={handleAnswerClick}>Submit</button>
      </div>
    </div>
  );
};
