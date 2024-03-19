import React, { useState } from "react";

import ImageSelection from "./ImageSelection";

import O_A_BP_FaD from "./data/json/O_A_BP_FaD.json";

const Controller = () => {
  const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

  const [userAnswers, setUserAnswers] = useState([]);

  const receiveUserAnswers = (answers) => {
    setUserAnswers(answers);
    // Now you can use userAnswers array in this component or pass it to another component
    console.log("Received user answers:", userAnswers);
  };

  return (
    <>
      <ImageSelection
        filename={"O_A_BP_FaD"}
        category={"marketplace"}
        jsonData={jsonData}
        receiveUserAnswers={receiveUserAnswers}
      />
    </>
  );
};

export default Controller;
