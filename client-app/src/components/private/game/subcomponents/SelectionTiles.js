import React, { useState, useRef, useEffect } from "react";

import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

// Tile component to render an image
const Tile = ({ imageUrl, onClick, index }) => (
	<div className="col-md-4 mb-3">
		<div className="card clickable text-center" onClick={() => onClick(index)}>
			<div className="card-img-center">
				<img src={imageUrl} className={Style["smaller-image"]} alt="" />
			</div>
		</div>
	</div>
);

function SelectionTiles({ question, imgLinks, audioFile, isCurrentSlide, moveToNextQuestion }) {
	// State to manage play/pause state
	const [isPlaying, setIsPlaying] = useState(false);
	const [shuffledImgLinks, setShuffledImgLinks] = useState([]);
	const [correctTileIndex, setCorrectTileIndex] = useState(0);

	const audioRef = useRef(null);

	// Effect to shuffle image links and find correct tile index when imgLinks changes
	useEffect(() => {
		const shuffledArray = [...imgLinks].sort(() => Math.random() - 0.5);
		const correctIndex = shuffledArray.findIndex((link) => link === imgLinks[0]);
		setCorrectTileIndex(correctIndex + 1);
		setShuffledImgLinks(shuffledArray);
	}, [imgLinks]);

	// Function to toggle play/pause of audio
	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Function called when audio playback ends
	const handleEnded = () => {
		setIsPlaying(false);
	};

	// Function called when a tile is clicked
	const handleTileClick = (index) => {
		const isCorrect = index + 1 === correctTileIndex;
		moveToNextQuestion(isCorrect);
	};

	// Autoplay when question shown to the user NOT IN USE
	/* useEffect(() => {
    // Start playing audio when the current slide is active
    if (isCurrentSlide) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isCurrentSlide]); */

	return (
		<div className="container" data-bs-theme="light">
			<h1 className="py-4">
				{question}
				{/* Conditional rendering of play/pause icon based on isPlaying state */}
				{isPlaying ? <PauseSVG onClick={togglePlay} /> : <PlaySVG onClick={togglePlay} />}

				<audio ref={audioRef} onEnded={handleEnded}>
					<source src={audioFile} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</h1>
			<div className="row">
				{/* Map over shuffledImgLinks array to render Tile components */}
				{shuffledImgLinks.map((imgLink, index) => (
					<Tile key={index} imageUrl={imgLink} onClick={handleTileClick} index={index} />
				))}
			</div>
		</div>
	);
}

export default SelectionTiles;
