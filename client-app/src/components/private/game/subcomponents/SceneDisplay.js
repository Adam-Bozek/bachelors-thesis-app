import React from "react";

import style from "./styles/Style.module.css";

import cabuuDefault from "../data/pictures/gif/cabuu-default.gif"

import firstScene from "../data/pictures/scenes/firstScene.png";

import marketplaceScene from "../data/pictures/scenes/marketplaceScene.png";
import mountainsScene from "../data/pictures/scenes/mountainsScene.png"; 
import zooScene from "../data/pictures/scenes/zooScene.png"; 
import homeScene from "../data/pictures/scenes/homeScene.jpeg"; 
import streetScene from "../data/pictures/scenes/streetScene.png";  

/*import finalScene from "../data/pictures/scenes/finalScene.png"*/

const SceneDisplay = ({ sceneType }) => {
  const displayFirstScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={cabuuDefault} alt="Animation of an robot" className={`${style["scene-display-firstScene-cabuu"]}`}/>
      <img src={firstScene} alt="Picture of preschool" className={`${style["scene-display-firstScene-picture"]}`} />
    </div>
  );

  const displayMarketplaceScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={marketplaceScene} alt="Marketplace Scene" />
    </div>
  );

  const displayMountainsScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={mountainsScene} alt="Mountains Scene" />
    </div>
  );

  const displayZooScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={zooScene} alt="Zoo Scene" />
    </div>
  );

  const displayHomeScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={homeScene} alt="Home Scene" />
    </div>
  );

  const displayStreetScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      <img src={streetScene} alt="Street Scene" />
    </div>
  );

  const displayFinalScene = () => (
    <div className={`${style["scene-display-div"]} container`}>
      {/* JSX for finalScene */}
    </div>
  );

  switch (sceneType) {
    case "firstScene":
      return displayFirstScene();
    case "marketplaceScene":
      return displayMarketplaceScene();
    case "mountainsScene":
      return displayMountainsScene();
    case "zooScene":
      return displayZooScene();
    case "homeScene":
      return displayHomeScene();
    case "streetScene":
      return displayStreetScene();
    case "finalScene":
      return displayFinalScene();
    default:
      return null; // Or return a default scene or an error message
  }
};

export default SceneDisplay;
