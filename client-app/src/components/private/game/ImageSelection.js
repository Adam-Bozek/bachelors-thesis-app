import React, { useState, useEffect } from "react";

import QuestionCarousel from "./subcomponents/QuestionCarousel";

/* TODO list
 *  TODO: make nice transition when user clicks on tile
 */

// Function to handle import of pictures and sounds
const importAll = (requireContext) => {
	let files = {};
	requireContext.keys().map((item, index) => {
		files[item.replace("./", "")] = requireContext(item);
	});
	return files;
};

// Function to import pictures
const imageFiles = importAll(require.context("./data/pictures", false, /\.(webp)$/));

// Function to import audio files
const audioFiles = importAll(require.context("./data/audio", false, /\.(mp3)$/));

// QuestionDisplay component to handle displaying questions
const ImageSelection = ({ filename, category, jsonData, receiveUserAnswers }) => {
	// State to manage slides containing questions
	const [slides, setSlides] = useState([]);

	// Function to fetch questions from JSON data
	const fetchQuestions = async () => {
		try {
			// Retrieve JSON data
			const data = jsonData();

			// Map data to slides array
			const slidesArray = data[category].map((item) => ({
				question: item.question,
				imgLinks: item.answers.map((answer) => imageFiles[`${filename}-${category}-${item.questionNo}-${answer.id}.webp`]),
				audioFile: audioFiles[`${filename}-${category}-${item.questionNo}.mp3`],
			}));
			// Set slides state
			setSlides(slidesArray);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	useEffect(() => {
		// Fetch questions when component mounts
		fetchQuestions();
	}, []);

	return (
		<>
			{/* Render QuestionCarousel with slides */}
			<QuestionCarousel slides={slides} componentType={"ImageSelection"} receiveUserAnswers={receiveUserAnswers} />
		</>
	);
};

export default ImageSelection;
