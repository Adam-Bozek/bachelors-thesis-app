import React, { useState } from "react";

import ImageSelection from "./ImageSelection";
import ImageRecognition from "./ImageRecognition";

import O_A_BP_FaD from "./data/json/O_A_BP_FaD.json";

const Controller = () => {
  const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

  const categories = ["marketplace", "mountains", "zoo", "home", "street"];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Define state variables and their updater functions for selection and recognition answers
  const [selectionAnswers, setSelectionAnswers] = useState([]);
  const [recognitionAnswers, setRecognitionAnswers] = useState([]);

  const receiveUserAnswers = (answers, componentType) => {
    // Store answers based on the current category index
    const category = categories[currentCategoryIndex];
    if (componentType.endsWith("ImageSelection")) {
      setSelectionAnswers((prevAnswers) => [
        ...prevAnswers,
        { category, answers },
      ]);
      setIsActive(true);
    } else if (componentType.endsWith("ImageRecognition")) {
      setRecognitionAnswers((prevAnswers) => [
        ...prevAnswers,
        { category, answers },
      ]);
      setIsActive(false);
      // Move to the next category after completing recognition
      setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      {currentCategoryIndex < categories.length && (
        <>
          {!isActive ? (
            <ImageSelection
              filename={"O_A_BP_FaD"}
              category={categories[currentCategoryIndex]}
              jsonData={jsonData}
              receiveUserAnswers={(answers) =>
                receiveUserAnswers(
                  answers,
                  `${categories[currentCategoryIndex]}ImageSelection`
                )
              }
            />
          ) : (
            <ImageRecognition
              filename={"O_A_BP_FaD"}
              category={categories[currentCategoryIndex]}
              jsonData={jsonData}
              receiveUserAnswers={(answers) =>
                receiveUserAnswers(
                  answers,
                  `${categories[currentCategoryIndex]}ImageRecognition`
                )
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default Controller;
