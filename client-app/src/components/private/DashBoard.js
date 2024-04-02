import React, { useContext, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Header from "./Header";
import Footer from "./Footer";
import { Context } from "../ContextProvider";

import O_A_BP_FaD from "./game/data/json/O_A_BP_FaD.json";

const Dashboard = () => {
  const pageName = "Informačný panel";
  const { selectionAnswers, recognitionAnswers } = useContext(Context);

  const [understandsAndSpeaksIndexes, setUnderstandsAndSpeaksIndexes] = useState([]);
  const [understandsIndexes, setUnderstandIndexes] = useState([]);
  const [doesNotUnderstandsIndexes,setDoesNotUnderstandsIndexes] = useState([]);

  const getAnswersForCategory = (category, answers) => {
    return answers.filter((answer) => answer.category === category);
  };

  const addDataToArray = (category, data, array) => {
    const existingCategoryIndex = array.findIndex(answer => answer.category === category);

    if (existingCategoryIndex !== -1) {
      // Category already exists, append data to its array
      const updatedAnswers = [...array];
      updatedAnswers[existingCategoryIndex].data.push(data);
      return updatedAnswers;
    } else {
      // Category doesn't exist, create a new one
      return [...array, { category, data: [data] }];
    }
  };

  const handleAddDataToUnderstandsAndSpeaksArray = (category, data) => {
    const updatedAnswers = addDataToArray(category, data, understandsAndSpeaksIndexes);
    setUnderstandsAndSpeaksIndexes(updatedAnswers);
  };

  const handleAddDataToUnderstandsArray = (category, data) => {
    const updatedAnswers = addDataToArray(category, data, understandsIndexes);
    setUnderstandIndexes(updatedAnswers);
  };

  const handleAddDataToDoesNotUnderstandArray = (category, data) => {
    const updatedAnswers = addDataToArray(category, data, doesNotUnderstandsIndexes);
    setDoesNotUnderstandsIndexes(updatedAnswers);
  };

  const countAnswers = (selectionAnswers, recognitionAnswers, category) => {
    let rozumieAHovoriCount = 0;
    let rozumieCount = 0;
    let nerozumieCount = 0;

    for (let i = 0; i < selectionAnswers.length; i++) {
      const selection = selectionAnswers[i];
      const recognition = recognitionAnswers[i];

      // Check if both selection and recognition are defined and have the same length
      if (
        selection &&
        recognition &&
        selection.answers.length === recognition.answers.length
      ) {
        for (let j = 0; j < selection.answers.length; j++) {
          const selAnswer = selection.answers[j];
          const recAnswer = recognition.answers[j];

          if (selAnswer !== undefined && recAnswer !== undefined) {
            // Rozumie a hovori
            if (selAnswer === true && recAnswer === true) {
              handleAddDataToUnderstandsAndSpeaksArray(category, j);
              rozumieAHovoriCount++;
            }
            // Rozumie
            else if (selAnswer === true && recAnswer === false) {
              handleAddDataToUnderstandsArray(category, j);
              rozumieCount++;
            }
            // Nerozumie
            else if (selAnswer === false && recAnswer === false) {
              handleAddDataToDoesNotUnderstandArray(category, j);
              nerozumieCount++;
            }
          }
        }
      }
    }

    return { rozumieAHovoriCount, rozumieCount, nerozumieCount };
  };

  const categories = ["marketplace", "mountains", "zoo", "home", "street"];

  return (
    <>
      <Header pageName={pageName} />
      <div className="container">
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
          <>
            <h1> Zatiaľ žiadne výsledky </h1>
            <p> Pre zobrazenie výsledkov dokončte hru </p>
          </>
        ) : (
          <>
            {categories.map((category) => {
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
                  recognitionAnswersForCategory,
                  category
                );

              console.log(
                category,
                rozumieAHovoriCount,
                rozumieCount,
                nerozumieCount
              );

              return (
                <div key={category}>
                  <h2>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Kategória
                  </h2>
                  <h4> Odpovede: </h4>
                  {/*<ul>
                    {getAnswersForCategory(category, understandsAndSpeaksIndexes).map(
                      (answer, index) => (
                        <li key={index}> Rozumie a hovorí:  </li>
                      )
                    )}
                    {getAnswersForCategory(category, understandsIndexes).map(
                      (answer, index) => (
                        <li key={index}> Rozumie:  </li>
                      )
                    )}
                    {getAnswersForCategory(category, doesNotUnderstandsIndexes).map(
                      (answer, index) => (
                        <li key={index}> Nerozumie:  </li>
                      )
                    )}
                      </ul>*/}
                  <PieChart
                    series={[
                      {
                        data: [
                          {
                            id: 0,
                            value: rozumieAHovoriCount,
                            label: "Rozumie a hovorí",
                          },
                          { id: 1, value: rozumieCount, label: "Rozumie" },
                          { id: 2, value: nerozumieCount, label: "Nerozumie" },
                        ],
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
                </div>
              );
            })}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
