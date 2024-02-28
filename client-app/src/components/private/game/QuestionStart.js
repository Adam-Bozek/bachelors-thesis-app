import React from "react";

import "./styles/Carousel.css";

import Tile from "./Tiles";

import ImgLink1 from "./data/pictures/O_A_BP_FaD-Marketplace-1-1.jpg";
import ImgLink2 from "./data/pictures/O_A_BP_FaD-Marketplace-1-2.webp";
import ImgLink3 from "./data/pictures/O_A_BP_FaD-Marketplace-1-3.webp";
import ImgLink4 from "./data/pictures/O_A_BP_FaD-Marketplace-1-4.webp";
import ImgLink5 from "./data/pictures/O_A_BP_FaD-Marketplace-1-5.webp";
import ImgLink6 from "./data/pictures/O_A_BP_FaD-Marketplace-1-6.png";

import ImgLink7 from "./data/pictures/O_A_BP_FaD-Marketplace-2-1.webp";
import ImgLink8 from "./data/pictures/O_A_BP_FaD-Marketplace-2-2.png";
import ImgLink9 from "./data/pictures/O_A_BP_FaD-Marketplace-2-3.avif";
import ImgLink10 from "./data/pictures/O_A_BP_FaD-Marketplace-2-4.jpg";
import ImgLink11 from "./data/pictures/O_A_BP_FaD-Marketplace-2-5.webp";
import ImgLink12 from "./data/pictures/O_A_BP_FaD-Marketplace-2-6.jpg";

import ImgLink13 from "./data/pictures/O_A_BP_FaD-Marketplace-3-1.avif";
import ImgLink14 from "./data/pictures/O_A_BP_FaD-Marketplace-3-2.jpg";
import ImgLink15 from "./data/pictures/O_A_BP_FaD-Marketplace-3-3.jpg";
import ImgLink16 from "./data/pictures/O_A_BP_FaD-Marketplace-3-4.jpg";
import ImgLink17 from "./data/pictures/O_A_BP_FaD-Marketplace-3-5.jpg";
import ImgLink18 from "./data/pictures/O_A_BP_FaD-Marketplace-3-6.webp";

import ImgLink19 from "./data/pictures/O_A_BP_FaD-Marketplace-4-1.jpg";
import ImgLink20 from "./data/pictures/O_A_BP_FaD-Marketplace-4-2.jpg";
import ImgLink21 from "./data/pictures/O_A_BP_FaD-Marketplace-4-3.jpg";
import ImgLink22 from "./data/pictures/O_A_BP_FaD-Marketplace-4-4.jpg";
import ImgLink23 from "./data/pictures/O_A_BP_FaD-Marketplace-4-5.png";
import ImgLink24 from "./data/pictures/O_A_BP_FaD-Marketplace-4-6.jpg";

const QuestionStart = () => {
    return (
        <>
            <div id="myCarousel" className="carousel slide mb-6" data-bs-theme="dark">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="0"
                        className="active"
                        aria-label="Slide 1"
                        aria-current="true"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                        className=""
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                        className=""
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#myCarousel"
                        data-bs-slide-to="3"
                        aria-label="Slide 4"
                        className=""
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <svg
                            className="bd-placeholder-img"
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <rect width="100%" height="100%" fill="white"></rect>
                        </svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <Tile
                                    question="Na ktorom obrázku je ananás?"
                                    imgLinks={[
                                        ImgLink1,
                                        ImgLink2,
                                        ImgLink3,
                                        ImgLink4,
                                        ImgLink5,
                                        ImgLink6,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg
                            className="bd-placeholder-img"
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <rect width="100%" height="100%" fill="white"></rect>
                        </svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <Tile
                                    question="Na ktorom obrázku je čokoláda?"
                                    imgLinks={[
                                        ImgLink7,
                                        ImgLink8,
                                        ImgLink9,
                                        ImgLink10,
                                        ImgLink11,
                                        ImgLink12,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg
                            className="bd-placeholder-img"
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <rect width="100%" height="100%" fill="white"></rect>
                        </svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <Tile
                                    question="Na ktorom obrázku je lekvár?"
                                    imgLinks={[
                                        ImgLink13,
                                        ImgLink14,
                                        ImgLink15,
                                        ImgLink16,
                                        ImgLink17,
                                        ImgLink18,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <svg
                            className="bd-placeholder-img"
                            width="100%"
                            height="100%"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <rect width="100%" height="100%" fill="white"></rect>
                        </svg>
                        <div className="container">
                            <div className="carousel-caption text-start">
                                <Tile
                                    question="Na ktorom obrázku je hrach?"
                                    imgLinks={[
                                        ImgLink19,
                                        ImgLink20,
                                        ImgLink21,
                                        ImgLink22,
                                        ImgLink23,
                                        ImgLink24,
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
};

export default QuestionStart;
