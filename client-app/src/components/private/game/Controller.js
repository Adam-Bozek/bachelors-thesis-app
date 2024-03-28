import React, { useState } from "react";

import ImageSelection from "./ImageSelection";
import ImageRecognition from "./ImageRecognition";

import O_A_BP_FaD from "./data/json/O_A_BP_FaD.json";

const Controller = () => {
  const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

  // State to store answers for ImageRecognition component
  const [recognitionAnswers, setRecognitionAnswers] = useState([]);
  // State to store answers for ImageSelection component
  const [selectionAnswers, setSelectionAnswers] = useState([]);

  const receiveUserAnswers = (answers, componentType) => {
    // Store answers in different arrays based on the component type
    if (componentType === "ImageRecognition") {
      setRecognitionAnswers((prevAnswers) => [...prevAnswers, answers]);
      console.log("recognitionAnswers:");
      console.log(recognitionAnswers);
    } else if (componentType === "ImageSelection") {
      setSelectionAnswers((prevAnswers) => [...prevAnswers, answers]);
      console.log("selectionAnswers:");
      console.log(selectionAnswers);
    }
  };

  return (
    <>
      {/* Render ImageRecognition component */}
      <ImageRecognition
        filename={"O_A_BP_FaD"}
        category={"marketplace"}
        jsonData={jsonData}
        receiveUserAnswers={(answers) =>
          receiveUserAnswers(answers, "ImageRecognition")
        }
      />

      {/* Render ImageSelection component */}
      <ImageSelection
        filename={"O_A_BP_FaD"}
        category={"marketplace"}
        jsonData={jsonData}
        receiveUserAnswers={(answers) =>
          receiveUserAnswers(answers, "ImageSelection")
        }
      />
    </>
  );
};

export default Controller;
