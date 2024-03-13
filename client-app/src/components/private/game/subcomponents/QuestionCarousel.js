import React, { useState, useEffect } from "react";

import "./styles/Carousel.css";

import Tiles from "./Tiles";

const QuestionCarousel = ({ slides }) => {
  // State to manage the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const moveToNextQuestion = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => prevSlide + 1);
      setIsTransitioning(false);
    }, 500); // Adjust the transition duration accordingly
  };

  // Effect hook to set up event listener when the component mounts
  useEffect(() => {
    const carouselElement = document.getElementById("myCarousel");
    const onSlide = () => {
      // Update currentSlide state when the carousel slides
      setCurrentSlide(
        parseInt(
          carouselElement
            .querySelector(".active")
            .getAttribute("data-bs-slide-to")
        )
      );
    };
    carouselElement.addEventListener("slid.bs.carousel", onSlide); // Add event listener for carousel slide event
    // Clean up event listener when component unmounts
    return () =>
      carouselElement.removeEventListener("slid.bs.carousel", onSlide);
  }, []);

  return (
    <>
      {/* Carousel container */}
      <div id="myCarousel" className="carousel slide mb-6" data-bs-theme="dark">
        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {/* Map over slides array to create carousel indicators */}
          {slides.map((slide, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#myCarousel"
              data-bs-slide-to={index}
              className={index === currentSlide ? "active" : ""}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            ></button>
          ))}
        </div>

        {/* Carousel inner content */}
        <div className="carousel-inner">
          {/* Map over slides array to create carousel items */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
            >
              <div className="container">
                <div className="carousel-caption text-start">
                  {/* Pass moveToNextQuestion function to Tiles component */}
                  <Tiles
                    question={slide.question}
                    imgLinks={slide.imgLinks}
                    audioFile={slide.audioFile}
                    isCurrentSlide={index === currentSlide}
                    moveToNextQuestion={moveToNextQuestion}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel control buttons */}
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

export default QuestionCarousel;
