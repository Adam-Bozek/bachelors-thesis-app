import React from "react";
import QuestionDisplay from "./subcomponents/QuestionDisplay";
import O_A_BP_FaD from "./data/json/O_A_BP_FaD.json";

const Controller = () => {
  const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

  return (
    <>
      <QuestionDisplay
        filename={"O_A_BP_FaD"}
        category={"marketplace"}
        jsonData={jsonData}
      />
    </>
  );
};

export default Controller;
