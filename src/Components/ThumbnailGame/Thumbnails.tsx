import React, { useEffect, useState } from "react";
import data from "../../data.json";
import axios from "axios";

export const ThumbnailsGame = () => {
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounting...");
  }, []);

  return <div>Thumbnails game</div>;
};
