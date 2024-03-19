import React, { useState, useEffect } from "react";

import "./styles/Carousel.css";

import SelectionTiles from "./SelectionTiles";
import RecognitionTile from "./RecognitionTile";

/* TODO list
 *  TODO: vertically center content inside of carousel
 */

// QuestionCarousel component to manage the carousel of questions
const QuestionCarousel = ({ slides, receiveUserAnswers, componentType }) => {
  // State to manage current slide and user answers
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Function to move to the next question
  const moveToNextQuestion = (isCorrect) => {
    // Update user answers
    setUserAnswers((prevAnswers) => [...prevAnswers, isCorrect]);
    // Check if all questions answered
    if (currentSlide === slides.length - 1) {
      console.log("All questions answered");
      // Send user answers to controller component
      receiveUserAnswers([...userAnswers, isCorrect]);
    } else {
      // Move to the next slide
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
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

    // Add event listener for carousel slide event
    carouselElement.addEventListener("slid.bs.carousel", onSlide);

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
                  {/* Conditional rendering based on componentType */}
                  {componentType === "ImageSelection" ? (
                    <SelectionTiles
                      question={slide.question}
                      imgLinks={slide.imgLink}
                      audioFile={slide.audioFile}
                      isCurrentSlide={index === currentSlide}
                      moveToNextQuestion={moveToNextQuestion}
                    />
                  ) : componentType === "ImageRecognition" ? (
                    <RecognitionTile
                      question={slide.question}
                      imgLink={slide.imgLinks}
                      audioFile={slide.audioFile}
                      isCurrentSlide={index === currentSlide}
                      moveToNextQuestion={moveToNextQuestion}
                    />
                  ) : null}
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
