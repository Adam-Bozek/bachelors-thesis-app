import React from 'react';
import Style from "./styles/Style.module.css";

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
    const handleClick = (index) => { 
        alert("you clicked tile number " + (index + 1)); 
    };

    return (
        <div className="container" data-bs-theme="light">
            <h1 className="py-4">{question}</h1>
            <div className="row">
                {imgLinks.map((imgLink, index) => (
                    <Tile
                        key={index}
                        imageUrl={imgLink}
                        onClick={handleClick}
                        index={index} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Tiles;
