import React, { useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ImageSelection from "./ImageSelection";
import ImageRecognition from "./ImageRecognition";
import SceneDisplay from "./subcomponents/SceneDisplay";

import { Context } from "../../ContextProvider";

import O_A_BP_FaD from "./data/json/O_A_BP_FaD.json";

const Controller = () => {
	const jsonData = () => JSON.parse(JSON.stringify(O_A_BP_FaD));

	const categories = [
		"firstScene",
		"marketplaceScene", "marketplace",
		"mountainsScene", "mountains",
    "zooScene", "zoo",
		"homeScene", "home",
		"streetScene", "street",
		"finalScene",
	];

	const { setSelectionAnswers, setRecognitionAnswers } = useContext(Context);

	const navigate = useNavigate();

	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [isActive, setIsActive] = useState(false);

	const advanceToNextCategory = () => {
		setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
	};

	// Define state variables and their updater functions for selection and recognition answers

	const receiveUserAnswers = (answers, componentType) => {
		// Store answers based on the current category index
		const category = categories[currentCategoryIndex];
		if (componentType.endsWith("ImageSelection")) {
			setSelectionAnswers((prevAnswers) => [...prevAnswers, { category, answers }]);
			setIsActive(true);
		} else if (componentType.endsWith("ImageRecognition")) {
			setRecognitionAnswers((prevAnswers) => [...prevAnswers, { category, answers }]);
			setIsActive(false);
			// Move to the next category after completing recognition
			setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
		}
	};

	// Check if all categories have been displayed
	const allCategoriesDisplayed = currentCategoryIndex >= categories.length;

	// Function to call when all categories are displayed
	const handleAllCategoriesDisplayed = () => {
		navigate("/Dashboard");
	};

	// useEffect hook to call the function when all categories are displayed
	useEffect(() => {
		if (allCategoriesDisplayed) {
			handleAllCategoriesDisplayed();
		}
	}, [allCategoriesDisplayed]);

	return (
		<>
			{!allCategoriesDisplayed && (
				<>
					{[2, 4, 6, 8, 10].includes(currentCategoryIndex) ? (
						<>
							{!isActive ? (
								<ImageSelection
									filename={"O_A_BP_FaD"}
									category={categories[currentCategoryIndex]}
									jsonData={jsonData}
									receiveUserAnswers={(answers) => receiveUserAnswers(answers, `${categories[currentCategoryIndex]}ImageSelection`)}
								/>
							) : (
								<ImageRecognition
									filename={"O_A_BP_FaD"}
									category={categories[currentCategoryIndex]}
									jsonData={jsonData}
									receiveUserAnswers={(answers) => receiveUserAnswers(answers, `${categories[currentCategoryIndex]}ImageRecognition`)}
								/>
							)}
						</>
					) : [0, 1, 3, 5, 7, 9, 11].includes(currentCategoryIndex) ? (
						<SceneDisplay sceneType={categories[currentCategoryIndex]} advanceToNextCategory={advanceToNextCategory} />
					) : (
						<></>
					)}
				</>
			)}
		</>
	);
};
export default Controller;
