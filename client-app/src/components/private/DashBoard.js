import React, { useContext } from "react";

import { PieChart } from "@mui/x-charts/PieChart";
import { Context } from "../ContextProvider";


import Footer from "./Footer";
import Header from "./Header";

import O_A_BP_FaD from "./game/data/json/O_A_BP_FaD.json";

const Dashboard = () => {
	// Page name for the header
	const pageName = "Informačný panel";

	// Categories for the test
	const categories = ["marketplace", "mountains", "zoo", "home", "street"];

	// Accessing context for user answers
	const { selectionAnswers, recognitionAnswers } = useContext(Context);

	// JSON data for correct answers
	const jsonData = O_A_BP_FaD;

	// Function to filter answers by category
	const getAnswersForCategory = (category, answers) => {
		return answers.filter((answer) => answer.category === category);
	};

	// Function to count the number of correct, incorrect, and partially correct answers
	const countAnswers = (selectionAnswers, recognitionAnswers) => {
		// Initialize counts
		let rozumieAHovoriCount = 0;
		let rozumieCount = 0;
		let nerozumieCount = 0;

		// Arrays to store question numbers for each category
		let rozumieAHovori = [];
		let rozumie = [];
		let nerozumie = [];

		// Loop through answers
		for (let i = 0; i < selectionAnswers.length; i++) {
			const selection = selectionAnswers[i];
			const recognition = recognitionAnswers[i];

			// Check if both selection and recognition answers exist and have the same length
			if (selection && recognition && selection.answers.length === recognition.answers.length) {
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

		return { rozumieAHovoriCount, rozumieCount, nerozumieCount, rozumieAHovori, rozumie, nerozumie };
	};

	// Aggregate counts for all categories
	const aggregatedCounts = categories.reduce(
		(acc, category) => {
			const selectionAnswersForCategory = getAnswersForCategory(category, selectionAnswers);
			const recognitionAnswersForCategory = getAnswersForCategory(category, recognitionAnswers);

			const { rozumieAHovoriCount, rozumieCount, nerozumieCount } = countAnswers(selectionAnswersForCategory, recognitionAnswersForCategory);

			// Accumulate counts
			acc.rozumieAHovoriCount += rozumieAHovoriCount;
			acc.rozumieCount += rozumieCount;
			acc.nerozumieCount += nerozumieCount;

			return acc;
		},
		{ rozumieAHovoriCount: 0, rozumieCount: 0, nerozumieCount: 0 },
	);

	// Data for the pie chart
	const seriesData = [
		{ id: 0, value: aggregatedCounts.rozumieAHovoriCount, label: "Rozumie a hovorí" },
		{ id: 1, value: aggregatedCounts.rozumieCount, label: "Rozumie" },
		{ id: 2, value: aggregatedCounts.nerozumieCount, label: "Nerozumie" },
	];

	// Function to retrieve data for each category
	const categoryData = () => {
		let marketplaceData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
		let mountainsData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
		let zooData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
		let homeData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };
		let streetData = { rozumieAHovori: [], rozumie: [], nerozumie: [] };

		// Loop through categories
		categories.forEach((category) => {
			const categorySelection = getAnswersForCategory(category, selectionAnswers);
			const categoryRecognition = getAnswersForCategory(category, recognitionAnswers);

			const { rozumieAHovori, rozumie, nerozumie } = countAnswers(categorySelection, categoryRecognition);

			// Assign counts to corresponding category
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

		return { marketplaceData, mountainsData, zooData, homeData, streetData };
	};

	// Function to find the correct answer for a question in a category
	const findCorrectAnswer = (questionNo, category) => {
		const categoryData = jsonData[category];
		if (!categoryData) {
			console.error(`Category '${category}' not found in JSON data.`);
			return null;
		}

		const question = categoryData.find((q) => q.questionNo === questionNo);
		if (!question) {
			console.error(`Question '${questionNo}' not found in category '${category}'.`);
			return null;
		}

		const correctAnswer = question.answers.find((answer) => answer.isCorrect);
		if (!correctAnswer) {
			console.error(`Correct answer not found for question '${questionNo}' in category '${category}'.`);
			return null;
		}

		return correctAnswer.answer;
	};

	// Function to display answers for each category
	const displayAnswers = () => {
		let understandsAndSpeaks = [];
		let understands = [];
		let doesNotUnderstand = [];

		const { marketplaceData, mountainsData, zooData, homeData, streetData } = categoryData();

		const categoryDataArray = [marketplaceData, mountainsData, zooData, homeData, streetData];

		categoryDataArray.forEach((data, index) => {
			const category = categories[index];
			for (const key in data) {
				if (Object.hasOwnProperty.call(data, key)) {
					const array = data[key];
					array.forEach((element, index) => {
						if (key === "rozumieAHovori") {
							element.forEach((num) => understandsAndSpeaks.push(findCorrectAnswer(num, category)));
						} else if (key === "rozumie") {
							element.forEach((num) => understands.push(findCorrectAnswer(num, category)));
						} else if (key === "nerozumie") {
							element.forEach((num) => doesNotUnderstand.push(findCorrectAnswer(num, category)));
						}
					});
				}
			}
		});

		return { understandsAndSpeaks, understands, doesNotUnderstand };
	};

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
						<h1> Výsledky testu </h1>
						<p> V následujúcich kategóriach budú zobrazené slová, ktorým dieťa: </p>
						<p>
							<strong> Rozumie a hovorí: </strong>
							{displayAnswers().understandsAndSpeaks.join(", ")}
						</p>
						<p>
							<strong> Rozumie: </strong>
							{displayAnswers().understands.join(", ")}
						</p>
						<p>
							<strong> Nerozumie: </strong>
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

			<Footer />
		</>
	);
};

export default Dashboard;
