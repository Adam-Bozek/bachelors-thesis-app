import React, { useState, useEffect } from "react";

import QuestionCarousel from "./QuestionCarousel";

/* TODO list
 *  TODO: make nice transition when user clicks on tile
 */

// Function to handle import of pictures and sounds
const importAll = (requireContext) => {
  let files = {};
  requireContext.keys().map((item, index) => {
    files[item.replace("./", "")] = requireContext(item);
  });
  return files;
};

// Function to import pictures
const imageFiles = importAll(
  require.context("../data/pictures", false, /\.(webp)$/)
);

// Function to import audio files
const audioFiles = importAll(
  require.context("../data/audio", false, /\.(mp3)$/)
);

const QuestionDisplay = ({
  filename,
  category,
  jsonData,
  receiveUserAnswers,
}) => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = jsonData();

      const slidesArray = data[category].map((item) => ({
        question: item.question,
        imgLinks: item.answers.map(
          (answer) =>
            imageFiles[`${filename}-${category}-${item.id}-${answer.id}.webp`]
        ),
        audioFile: audioFiles[`${filename}-${category}-${item.id}.mp3`],
      }));
      setSlides(slidesArray);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <QuestionCarousel
        slides={slides}
        receiveUserAnswers={receiveUserAnswers}
      />
    </>
  );
};

export default QuestionDisplay;
