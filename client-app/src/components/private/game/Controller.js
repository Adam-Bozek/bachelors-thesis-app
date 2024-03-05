import React, { useState, useEffect } from "react";

import QuestionCarousel from "./subcomponents/QuestionCarousel";

import O_A_BP_FaD from "./data/questions/O_A_BP_FaD.json";

// Function to dynamically import images
const importAll = (require) => {
  let images = {};
  require.keys().map((item, index) => {
    images[item.replace("./", "")] = require(item);
  });
  return images;
};

const images = importAll(
  require.context("./data/pictures", false, /\.(png|jpe?g|svg|webp)$/)
);

const Controller = () => {
  const [slides, setSlides] = useState([]);

  const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = jsonData();

      const slidesArray = data.marketplace.map((item) => ({
        question: item.question,
        imgLinks: item.answers.map(
          (answer) =>
            images[`O_A_BP_FaD-Marketplace-${item.id}-${answer.id}.webp`]
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