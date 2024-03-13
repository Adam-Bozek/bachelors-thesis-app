import React, { useState, useRef, useEffect } from "react";

import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

// Define Tile template
const Tile = ({ imageUrl, onClick, index }) => (
  <div className="col-md-4 mb-3">
    <div className="card clickable text-center" onClick={() => onClick(index)}>
      <div className="card-img-center">
        <img src={imageUrl} className={Style["smaller-image"]} alt="" />
      </div>
    </div>
  </div>
);

const Tiles = ({ question, imgLinks, audioFile, isCurrentSlide, moveToNextQuestion }) => {
  // State to manage play/pause state
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledImgLinks, setShuffledImgLinks] = useState([]);
  const [correctTileIndex, setCorrectTileIndex] = useState(0);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Shuffle the image links array
    const shuffledArray = [...imgLinks].sort(() => Math.random() - 0.5);

    // Find the index of the correct picture in the shuffled array
    const correctIndex = shuffledArray.findIndex(
      (link) => link === imgLinks[0]
    );
    setCorrectTileIndex(correctIndex + 1);

    // Set the shuffled image links array
    setShuffledImgLinks(shuffledArray);
  }, [imgLinks]);

  // Autoplay when question shown to the user NOT IN USE
  /* useEffect(() => {
    // Start playing audio when the current slide is active
    if (isCurrentSlide) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isCurrentSlide]); */

  // Function to play or pause question audio
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Function to handle what happens after question answer
  const handleTileClick = (index) => {
    if (index + 1 === correctTileIndex) {
      
    }
    else {

    }

    moveToNextQuestion();
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
      <div className="row">
        {/* Map over shuffledImgLinks array to render Tile components */}
        {shuffledImgLinks.map((imgLink, index) => (
          <Tile
            key={index}
            imageUrl={imgLink}
            onClick={handleTileClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Tiles;
