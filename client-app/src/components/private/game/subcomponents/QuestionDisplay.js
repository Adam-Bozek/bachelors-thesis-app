import React, { useState, useEffect } from "react";

import QuestionCarousel from "./QuestionCarousel";

// Function to import all images from a directory using Webpack's require.context
const importAll = (require) => {
  let images = {};
  require.keys().map((item, index) => {
    images[item.replace("./", "")] = require(item);
  });
  return images;
};

// Importing all images from the specified directory
const images = importAll(
  require.context("../data/pictures", false, /\.(png|jpe?g|svg|webp)$/)
);

const QuestionDisplay = ({ filename, category, jsonData }) => {
  // State to store the fetched slides
  const [slides, setSlides] = useState([]);

  // useEffect hook to fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Function to fetch questions asynchronously
  const fetchQuestions = async () => {
    try {
      // Getting JSON data
      const data = jsonData();

      // Creating an array of slides from the fetched data
      const slidesArray = data[category].map((item) => ({
        question: item.question,
        // Getting image links for answers from the imported images
        imgLinks: item.answers.map(
          (answer) =>
            images[`${filename}-${category}-${item.id}-${answer.id}.webp`]
        ),
      }));
      setSlides(slidesArray);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <QuestionCarousel slides={slides} />
    </>
  );
};

export default QuestionDisplay;
