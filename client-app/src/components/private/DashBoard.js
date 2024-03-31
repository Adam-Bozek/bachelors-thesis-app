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
              V tejto časti sú zobrazené reprezentácie odpovedí dieťaťa na otázky.
            </p>
            <h2>Marketplace Selection Answers</h2>
            <ul>
              {marketplaceSelectionData.map((answer, index) => (
                <li key={index}>{answer.answers}</li>
              ))}
            </ul>

            <h2>Marketplace Recognition Answers</h2>
            <ul>
              {marketplaceRecognitionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <h2>Mountains Selection Answers</h2>
            <ul>
              {mountainsSelectionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>

            <h2>Mountains Recognition Answers</h2>
            <ul>
              {mountainsRecognitionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <h2>zoo Selection Answers</h2>
            <ul>
              {zooSelectionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>

            <h2>zoo Recognition Answers</h2>
            <ul>
              {zooRecognitionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <h2>home Selection Answers</h2>
            <ul>
              {homeSelectionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>

            <h2>home Recognition Answers</h2>
            <ul>
              {homeRecognitionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <h2>street Selection Answers</h2>
            <ul>
              {streetSelectionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>

            <h2>street Recognition Answers</h2>
            <ul>
              {streetRecognitionData.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
