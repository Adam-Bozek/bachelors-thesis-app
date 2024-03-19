import React, { useState, useRef } from "react";

import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

// Tile component to render an image
const Tile = ({ imageUrl, onClick }) => (
  <div className="col-md-4 mb-3">
    <div className="card clickable text-center" onClick={onClick}>
      <div className="card-img-center">
        <img src={imageUrl} className={Style["smaller-image"]} alt="" />
      </div>
    </div>
  </div>
);

function Tiles({ question, imgLink, audioFile, moveToNextQuestion }) {
  // State to manage play/pause state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Function to toggle play/pause of audio
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Function called when audio playback ends
  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Function called when the tile is clicked
  const handleTileClick = () => {
    moveToNextQuestion(true); // Assuming there's only one tile and it's always correct
  };

  return (
    <div className="container" data-bs-theme="light">
      <h1 className="py-4">
        {question}
        {/* Conditional rendering of play/pause icon based on isPlaying state */}
        {isPlaying ? (
          <PauseSVG onClick={togglePlay} />
        ) : (
          <PlaySVG onClick={togglePlay} />
        )}

        <audio ref={audioRef} onEnded={handleEnded}>
          <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </h1>
      <div className="row justify-content-center">
        {/* Render Tile component with the single image */}
        <Tile imageUrl={imgLink} onClick={handleTileClick} />
      </div>
    </div>
  );
}

export default Tiles;
