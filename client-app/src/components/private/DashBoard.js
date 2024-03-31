import React, { useContext } from "react";

import Header from "./Header";
import Footer from "./Footer";

import { Context } from "../ContextProvider";

const Dashboard = () => {
  const pageName = "Informačný panel";

  const { selectionAnswers, recognitionAnswers } = useContext(Context);

  const getSelectionAnswersForCategory = (category) => {
    return selectionAnswers.filter((answer) => answer.category === category);
  };

  const getRecognitionAnswersForCategory = (category) => {
    return recognitionAnswers.filter((answer) => answer.category === category);
  };

  const marketplaceSelectionData = getSelectionAnswersForCategory("marketplace");
  const marketplaceRecognitionData = getRecognitionAnswersForCategory("marketplace");

  const mountainsSelectionData = getSelectionAnswersForCategory("mountains");
  const mountainsRecognitionData = getRecognitionAnswersForCategory("mountains");

  const zooSelectionData = getSelectionAnswersForCategory("zoo");
  const zooRecognitionData = getRecognitionAnswersForCategory("zoo");

  const homeSelectionData = getSelectionAnswersForCategory("home");
  const homeRecognitionData = getRecognitionAnswersForCategory("home");

  const streetSelectionData = getSelectionAnswersForCategory("street");
  const streetRecognitionData = getRecognitionAnswersForCategory("street");

  const categories = ["marketplace", "mountains", "zoo", "home", "street"];

  return (
    <>
      <Header pageName={pageName} />

      <div className="container">
        {marketplaceSelectionData.length === 0 ||
        marketplaceRecognitionData.length === 0 ||
        mountainsSelectionData.length === 0 ||
        mountainsRecognitionData.length === 0 ||
        zooSelectionData.length === 0 ||
        zooRecognitionData.length === 0 ||
        homeSelectionData.length === 0 ||
        homeRecognitionData.length === 0 ||
        streetSelectionData.length === 0 ||
        streetRecognitionData.length === 0 ? (
          <h1> Zatiaľ žiadne výsledky </h1>
        ) : (
          <>
            <h1> Výsledky </h1>
            <p>
              V tejto časti sú zobrazené reprezentácie odpovedí dieťaťa na
              otázky.
            </p>
            {categories.map((category) => (
              <div key={category}>
                <h2>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  Selection Answers
                </h2>
                <ul>
                  {getSelectionAnswersForCategory(category).map(
                    (answer, index) => (
                      <li key={index}>{answer.answers}</li>
                    )
                  )}
                </ul>

                <h2>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  Recognition Answers
                </h2>
                <ul>
                  {getRecognitionAnswersForCategory(category).map(
                    (answer, index) => (
                      <li key={index}>{answer.answers}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
