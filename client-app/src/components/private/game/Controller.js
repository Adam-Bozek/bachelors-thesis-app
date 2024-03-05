import React, { useState, useEffect } from "react";

import QuestionCarousel from "./subcomponents/QuestionCarousel";

// Function to dynamically import images
const importAll = (require) => {
  // Initialize an empty object to store the imported images
  let images = {};
  // Using require.context to get all image files from the specified directory
  require.keys().map((item, index) => {
    // Store each imported image in the images object with its filename as the key
    images[item.replace("./", "")] = require(item);
  });
  return images;
};

// Call the importAll function to import all images from the specified directory
const images = importAll(
  require.context("./data/pictures", false, /\.(png|jpe?g|svg|webp)$/)
);

const Controller = ({ filename, category, jsonData }) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Function to fetch questions asynchronously
  const fetchQuestions = async () => {
    try {
      const data = jsonData();

      // Create an array of slides by mapping over the 'marketplace' array in the JSON data
      const slidesArray = data.marketplace.map((item) => ({
        question: item.question,
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

export default Controller;