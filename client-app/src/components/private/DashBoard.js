// Importing necessary modules and components from React and other libraries
import React, { useContext, useState } from "react";
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
              rozumieAHovori.push(j + 1);
            } else if (selAnswer === true && recAnswer === false) {
              rozumieCount++;
              rozumie.push(j + 1);
            } else if (selAnswer === false && recAnswer === false) {
              nerozumieCount++;
              nerozumie.push(j + 1);
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
      const selectionAnswersForCategory = getAnswersForCategory(
        category,
        selectionAnswers
      );
      const recognitionAnswersForCategory = getAnswersForCategory(
        category,
        recognitionAnswers
      );

      const { rozumieAHovoriCount, rozumieCount, nerozumieCount } =
        countAnswers(
          selectionAnswersForCategory,
          recognitionAnswersForCategory
        );

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
    let marketplaceData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
    let mountainsData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
    let zooData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
    let homeData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
    let streetData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };

    categories.forEach((category) => {
      const categorySelection = getAnswersForCategory(
        category,
        selectionAnswers
      );
      const categoryRecognition = getAnswersForCategory(
        category,
        recognitionAnswers
      );

      const { rozumieAHovori, rozumie, nerozumie } = countAnswers(
        categorySelection,
        categoryRecognition
      );

      if (category === "marketplace") {
        marketplaceData.rozumieAHovori.push(rozumieAHovori);
        marketplaceData.rozumie.push(rozumie);
        marketplaceData.nerozumie.push(nerozumie);
      } else if (category === "mountains") {
        mountainsData.rozumieAHovori.push(rozumieAHovori);
        mountainsData.rozumie.push(rozumie);
        mountainsData.nerozumie.push(nerozumie);
      } else if (category === "zoo") {
        zooData.rozumieAHovori.push(rozumieAHovori);
        zooData.rozumie.push(rozumie);
        zooData.nerozumie.push(nerozumie);
      } else if (category === "home") {
        homeData.rozumieAHovori.push(rozumieAHovori);
        homeData.rozumie.push(rozumie);
        homeData.nerozumie.push(nerozumie);
      } else if (category === "street") {
        streetData.rozumieAHovori.push(rozumieAHovori);
        streetData.rozumie.push(rozumie);
        streetData.nerozumie.push(nerozumie);
      }
    });

    return {
      marketplaceData,
      mountainsData,
      zooData,
      homeData,
      streetData,
    };
  };

  const findCorrectAnswer = (questionNo, category) => {
    // Find the category object in the JSON data
    const categoryData = jsonData[category];
    if (!categoryData) {
      console.error(`Category '${category}' not found in JSON data.`);
      return null;
    }

    // Find the question with the given questionNo in the category data
    const question = categoryData.find((q) => q.questionNo === questionNo);
    if (!question) {
      console.error(
        `Question '${questionNo}' not found in category '${category}'.`
      );
      return null;
    }

    // Find the correct answer for the question
    const correctAnswer = question.answers.find((answer) => answer.isCorrect);
    if (!correctAnswer) {
      console.error(
        `Correct answer not found for question '${questionNo}' in category '${category}'.`
      );
      return null;
    }

    return correctAnswer.answer; // Return only the answer string
  };

  const displayAnswers = () => {
    let understandsAndSpeaks = [];
    let understands = [];
    let doesNotUnderstand = [];

    const { marketplaceData, mountainsData, zooData, homeData, streetData } =
      categoryData();

    const categoryDataArray = [
      marketplaceData,
      mountainsData,
      zooData,
      homeData,
      streetData,
    ];

    categoryDataArray.forEach((data, index) => {
      const category = categories[index];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const array = data[key];
          array.forEach((element, index) => {
            if (key === "rozumieAHovori") {
              element.forEach((num) =>
                understandsAndSpeaks.push(findCorrectAnswer(num, category))
              );
            } else if (key === "rozumie") {
              element.forEach((num) =>
                understands.push(findCorrectAnswer(num, category))
              );
            } else if (key === "nerozumie") {
              element.forEach((num) =>
                doesNotUnderstand.push(findCorrectAnswer(num, category))
              );
            }
          });
        }
      }
    });

    console.log(understandsAndSpeaks, understands, doesNotUnderstand);

    return { understandsAndSpeaks, understands, doesNotUnderstand };
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
            <p>
              V následujúcich kategóriach budú zobrazené slová ktorým dieťa:
            </p>
            {/* Display answers here */}
            <p>
              <strong>Rozumie a hovrí </strong>
              {displayAnswers().understandsAndSpeaks.join(", ")}
            </p>
            <p>
              <strong> Rozumie: </strong>
              {displayAnswers().understands.join(", ")}
            </p>
            <p>
              <strong>Nerozumie:</strong>
              {displayAnswers().doesNotUnderstand.join(", ")}
            </p>
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
          </>
        )}
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default Dashboard; // Exporting Dashboard component
