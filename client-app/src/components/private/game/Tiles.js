import React, { useState } from 'react';
import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

// Template for tiles
const Tile = ({ imageUrl, onClick, index }) => (
    <div className="col-md-4 mb-3">
        <div className="card clickable text-center" onClick={() => onClick(index)}> 
            <div className="card-img-center">
                <img src={imageUrl} className={Style["smaller-image"]} alt='' />
            </div>
        </div>
    </div>
);

const Tiles = ({ question, imgLinks }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTileClick = (index) => { 
        alert("you clicked tile number " + (index + 1));
    };

    const handlePausePlayClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="container" data-bs-theme="light">
            <h1 className="py-4"> {question} {isPlaying ? <PauseSVG onClick={handlePausePlayClick}/> : <PlaySVG onClick={handlePausePlayClick}/>} </h1>
            <div className="row">
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
