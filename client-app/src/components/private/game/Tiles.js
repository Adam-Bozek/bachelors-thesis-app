import React, { useState } from "react";

import Style from "./styles/Style.module.css";

// Import SVG icons as components
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

const Tiles = ({ question, imgLinks }) => {
    // State to manage play/pause state
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTileClick = (index) => {
        alert("you clicked tile number " + (index + 1));
    };

    const handlePausePlayClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="container" data-bs-theme="light">
            <h1 className="py-4">
                {question}
                {/* Conditional rendering of play/pause icon based on isPlaying state */}
                {isPlaying ? (
                    <PauseSVG onClick={handlePausePlayClick} />
                ) : (
                    <PlaySVG onClick={handlePausePlayClick} />
                )}
            </h1>
            <div className="row">
                {/* Map over imgLinks array to render Tile components */}
                {imgLinks.map((imgLink, index) => (
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
