import React from 'react';

import "./TilesStyle.css";

import O_A_BP_FaD from "./data/questions/O_A_BP_FaD.json";
import SoA_AS from "./data/questions/SoA_AS.json";

import Image1 from "./data/pictures/O_A_BP_FaD-Marketplace-1-1.jpg";
import Image2 from "./data/pictures/O_A_BP_FaD-Marketplace-1-2.webp";
import Image3 from "./data/pictures/O_A_BP_FaD-Marketplace-1-3.webp";
import Image4 from "./data/pictures/O_A_BP_FaD-Marketplace-1-4.webp";
import Image5 from "./data/pictures/O_A_BP_FaD-Marketplace-1-5.webp";
import Image6 from "./data/pictures/O_A_BP_FaD-Marketplace-1-6.png";

const ClickableCard = ({ imageUrl, title, onClick }) => (
    <div className="col-md-4 mb-3">
        <div className="card clickable text-center" onClick={onClick}>
            <div className="card-img-center">
                <img src={imageUrl} className="smaller-image" alt={title} />
            </div>
        </div>
    </div>
);

const Tiles = () => {
    const handleClick = () => {
        alert("you clicked");
    };

    return (
        <>
            <div className="container">
                <h1 className="py-5"> Na ktorom obrázku sa nachádza ananás? </h1>
                <div className="row">
                    <ClickableCard
                        imageUrl={Image1}
                        title="Card 1"
                        onClick={handleClick}
                    />
                    <ClickableCard
                        imageUrl={Image2}
                        title="Card 2"
                        onClick={handleClick}
                    />
                    <ClickableCard
                        imageUrl={Image3}
                        title="Card 3"
                        onClick={handleClick}
                    />
                    <ClickableCard
                        imageUrl={Image4}
                        title="Card 4"
                        onClick={handleClick}
                    />
                    <ClickableCard
                        imageUrl={Image5}
                        title="Card 5"
                        onClick={handleClick}
                    />
                    <ClickableCard
                        imageUrl={Image6}
                        title="Card 6"
                        onClick={handleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default Tiles;
