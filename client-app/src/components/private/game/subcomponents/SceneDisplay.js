import React from "react";

import firstScene from "../data/pictures/scenes/firstScene.png"
import finalScene from "../data/pictures/scenes/finalScene.png"

import marketplaceScene from "../data/pictures/scenes/marketplaceScene.png;";
import mountainsScene from "../data/pictures/scenes/mountainsScene.png;"; 
import zooScene from "../data/pictures/scenes/zooScene.png"; 
import homeScene from "../data/pictures/scenes/homeScene.jpeg"; 
import streetScene from "../data/pictures/scenes/streetScene.png";  

const SceneDisplay = (sceneType) => {
  const displayFirstScene = () => {};

  const displayMarketplaceScene = () => {};

  const displayMountainsScene = () => {};

  const displayZooScene = () => {};

  const displayHomeScene = () => {};

  const displayStreetScene = () => {};

  const displayFinalScene = () => {};
  
  return (
    <>
      {sceneType === "firstScene" ? (
        {displayFirstScene}
      ) :
      sceneType === "marketplaceScene" ? (
        {displayMarketplaceScene}
      ) :
      sceneType === "mountainsScene" ? (
        {displayMountainsScene}
      ) :
      sceneType === "zooScene" ? (
        {displayZooScene}
      ) : 
      sceneType === "homeScene" ? (
        {displayHomeScene}
      ) :
      sceneType === "streetScene" ? (
        {displayStreetScene}
      ) :
      sceneType === "finalScene" ? (
        {displayFinalScene}
      ) : (<></>)}
    </>
  );
};

export default SceneDisplay;