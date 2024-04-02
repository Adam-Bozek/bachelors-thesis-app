// Importing necessary modules and components from React and other libraries
import React, { useContext,useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Header from "./Header";
import Footer from "./Footer";
import { Context } from "../ContextProvider"; // Importing context
import O_A_BP_FaD from "./game/data/json/O_A_BP_FaD.json"; // Importing JSON data

// Functional component Dashboard
const Dashboard = () => {
  // Defining pageName constant
  const pageName = "Informačný panel";

  // Using useContext hook to get data from Context Provider
  const { selectionAnswers, recognitionAnswers } = useContext(Context);

  // Storing JSON data in a variable
  const jsonData = O_A_BP_FaD;

  // Function to filter answers by category
  const getAnswersForCategory = (category, answers) => {
    return answers.filter((answer) => answer.category === category);
  };

  // Function to count answers
  const countAnswers = (selectionAnswers, recognitionAnswers) => {
    // Initializing counts and arrays to store specific answers
    let rozumieAHovoriCount = 0;
    let rozumieCount = 0;
    let nerozumieCount = 0;

    let rozumieAHovori = [];
    let rozumie = [];
    let nerozumie = [];

    // Looping through answers and updating counts and arrays
    for (let i = 0; i < selectionAnswers.length; i++) {
      const selection = selectionAnswers[i];
      const recognition = recognitionAnswers[i];

      if (
        selection &&
        recognition &&
        selection.answers.length === recognition.answers.length
      ) {
        for (let j = 0; j < selection.answers.length; j++) {
          const selAnswer = selection.answers[j];
          const recAnswer = recognition.answers[j];

          if (selAnswer !== undefined && recAnswer !== undefined) {
            if (selAnswer === true && recAnswer === true) {
              rozumieAHovoriCount++;
              rozumieAHovori.push(j+1);
            } else if (selAnswer === true && recAnswer === false) {
              rozumieCount++;
              rozumie.push(j+1);
            } else if (selAnswer === false && recAnswer === false) {
              nerozumieCount++;
              nerozumie.push(j+1);
            }
          }
        }
      }
    }

    // Returning counts and arrays
    return {
      rozumieAHovoriCount,
      rozumieCount,
      nerozumieCount,
      rozumieAHovori,
      rozumie,
      nerozumie,
    };
  };

  // Array of categories
  const categories = ["marketplace", "mountains", "zoo", "home", "street"];

  // Aggregating counts for all categories
  const aggregatedCounts = categories.reduce(
    (acc, category) => {
      const selectionAnswersForCategory = getAnswersForCategory( category, selectionAnswers );
      const recognitionAnswersForCategory = getAnswersForCategory( category, recognitionAnswers );

      const { rozumieAHovoriCount, rozumieCount, nerozumieCount, } = countAnswers( selectionAnswersForCategory, recognitionAnswersForCategory );

      acc.rozumieAHovoriCount += rozumieAHovoriCount;
      acc.rozumieCount += rozumieCount;
      acc.nerozumieCount += nerozumieCount;

      return acc;
    },
    { rozumieAHovoriCount: 0, rozumieCount: 0, nerozumieCount: 0 }
  );

  // Getting correct answers for each category
  const correctAnswers = categories.map((category) => {
    const questions = jsonData[category];
    const correctAnswersForCategory = questions.map((question) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      return { questionNo: question.questionNo, correctAnswer };
    });
    return { category, correctAnswersForCategory };
  });

  // Data for PieChart component
  const seriesData = [
    {
      id: 0,
      value: aggregatedCounts.rozumieAHovoriCount,
      label: "Rozumie a hovorí",
    },
    { id: 1, value: aggregatedCounts.rozumieCount, label: "Rozumie" },
    { id: 2, value: aggregatedCounts.nerozumieCount, label: "Nerozumie" },
  ];

  const categoryData = () => {
    let marketplaceData = [];
    let mountainsData = [];
    let zooData = [];
    let homeData = [];
    let streetData = [];

    categories.forEach(category => {
      const categorySelection = getAnswersForCategory( category, selectionAnswers );
      const categoryRecognition = getAnswersForCategory( category, recognitionAnswers );

      const { rozumieAHovori, rozumie, nerozumie, } = countAnswers( categorySelection, categoryRecognition );

      if (category === "marketplace") {
        marketplaceData.push( rozumieAHovori, rozumie, nerozumie);
      } else if (category === "mountains") {
        mountainsData.push( rozumieAHovori, rozumie, nerozumie);
      } else if (category === "zoo" ) {
        zooData.push( rozumieAHovori, rozumie, nerozumie);
      } else if (category === "home" ) {
        homeData.push( rozumieAHovori, rozumie, nerozumie);
      } else if (category === "street" ) {
        streetData.push( rozumieAHovori, rozumie, nerozumie);
      }
    })

    console.log(marketplaceData, mountainsData, zooData, homeData, streetData);
    return { marketplaceData, mountainsData ,zooData, homeData, streetData }; 
  };

  // Rendering UI elements
  return (
    <>
      <Header pageName={pageName} /> {/* Header component */}
      <div className="container">
        {/* Conditional rendering based on availability of answers */}
        {getAnswersForCategory("marketplace", selectionAnswers).length === 0 ||
        getAnswersForCategory("marketplace", recognitionAnswers).length === 0 ||
        getAnswersForCategory("mountains", selectionAnswers).length === 0 ||
        getAnswersForCategory("mountains", recognitionAnswers).length === 0 ||
        getAnswersForCategory("zoo", selectionAnswers).length === 0 ||
        getAnswersForCategory("zoo", recognitionAnswers).length === 0 ||
        getAnswersForCategory("home", selectionAnswers).length === 0 ||
        getAnswersForCategory("home", recognitionAnswers).length === 0 ||
        getAnswersForCategory("street", selectionAnswers).length === 0 ||
        getAnswersForCategory("street", recognitionAnswers).length === 0 ? (
          // Render if no answers are available
          <>
            <h1> Zatiaľ žiadne výsledky </h1>
            <p> Pre zobrazenie výsledkov dokončte hru </p>
          </>
        ) : (
          // Render results if answers are available
          <>
            <h1> Výsledky testu </h1>
            <PieChart
              series={[
                {
                  data: seriesData,
                  innerRadius: 35,
                  outerRadius: 90,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 100,
                  cy: 100,
                },
              ]}
              width={400}
              height={200}
            />
            <div>
              {/* Mapping and rendering correct answers for each category */}
              {correctAnswers.map((category) => (
                <div key={category.category}>
                  <h2>
                    {category.category.charAt(0).toUpperCase() +
                      category.category.slice(1)}{" "}
                    Kategória
                  </h2>
                  {category.correctAnswersForCategory.map((question) => (
                    <p key={question.questionNo}>
                      Otázka {question.questionNo}:{" "}
                      {question.correctAnswer.answer}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default Dashboard; // Exporting Dashboard component
