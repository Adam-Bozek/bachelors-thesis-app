import React, { useState, useRef, useEffect } from "react";

import style from "./styles/Style.module.css";

// Imports for whole page
import robotDefault from "../data/pictures/gif/robot-default.gif";
import robotWinter from "../data/pictures/gif/robot-winter.gif"; 
import robotZoo from "../data/pictures/gif/robot-zoo.gif"; 
import robotParty from "../data/pictures/gif/robot-party.gif"; 

import monster from "../data/pictures/scenes/monster.jpeg"; 

// Imports for the first scene
import firstScene from "../data/pictures/scenes/firstScene.png"; 
import firstSceneAudioPartOne from "../data/audio/audio-for-scenes/firstScene-1.mp3";
import firstSceneAudioPartTwo from "../data/audio/audio-for-scenes/firstScene-2.mp3"; 

// Imports for the marketplace scene
import marketplaceScene from "../data/pictures/scenes/marketplaceScene.png";
import marketplaceSceneAudio from "../data/audio/audio-for-scenes/marketplaceScene.mp3";

// Imports for mountains scene
import mountainsScene from "../data/pictures/scenes/mountainsScene.png"; 
import mountainsSceneAudio from "../data/audio/audio-for-scenes/mountainsScene.mp3"; 

// Imports for the Zoo scene
import zooScene from "../data/pictures/scenes/zooScene.png"; 
import zooSceneAudio from "../data/audio/audio-for-scenes/zooScene.mp3"; 

// Imports for the home scene
import homeScene from "../data/pictures/scenes/homeScene.jpeg";
import homeSceneAudio from "../data/audio/audio-for-scenes/homeScene.mp3";

// Imports for the street scene
import streetScene from "../data/pictures/scenes/streetScene.png";
import streetSceneAudio from "../data/audio/audio-for-scenes/streetScene.mp3";

// Imports for the final scene
import finalScene from "../data/pictures/scenes/finalScene.jpeg";
import finalSceneAudio from "../data/audio/audio-for-scenes/placeholder.mp3";

const SceneDisplay = ({ sceneType, advanceToNextCategory }) => {
	// State for tracking second part of audio played and whether audio is currently playing
	const [secondAudioPlayed, setSecondAudioPlayed] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	// Reference for the audio element
	const audioRef = useRef(null);

	// Function to toggle play/pause of audio
	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};

	// Function to handle audio end
	const handleEnded = () => {
		if (!secondAudioPlayed && sceneType === "firstScene") {
			audioRef.current.src = firstSceneAudioPartTwo;
			audioRef.current.play();
			setSecondAudioPlayed(true);
		} else {
			setIsPlaying(false);
			setSecondAudioPlayed(false);
			advanceToNextCategory();
		}
	};

	// Effect to play audio when scene changes
	useEffect(() => {
		if (!isPlaying) {
			togglePlay();
		}
	}, [sceneType, isPlaying]);

	// Function to display first scene
	const displayFirstScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotDefault} className={`${style["scene-display-robot"]}`} />
			<img src={firstScene} className={`${style["scene-display-firstScene-picture"]}`} />
			{secondAudioPlayed ? <img src={monster} className={`${style["scene-display-firstScene-monster"]}`} /> : <></>}
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={firstSceneAudioPartOne} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display marketplace scene
	const displayMarketplaceScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotDefault} className={`${style["scene-display-robot"]}`} />
			<img src={marketplaceScene} alt="Marketplace Scene" className={`${style["scene-display-marketplaceScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={marketplaceSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display mountains scene
	const displayMountainsScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotWinter} className={`${style["scene-display-robot"]}`} />
			<img src={mountainsScene} alt="Mountains Scene" className={`${style["scene-display-mountainsScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={mountainsSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display zoo scene
	const displayZooScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotZoo} className={`${style["scene-display-robot"]}`} />
			<img src={zooScene} alt="Zoo Scene" className={`${style["scene-display-zooScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={zooSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display home scene
	const displayHomeScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotDefault} className={`${style["scene-display-robot"]}`} />
			<img src={homeScene} alt="Home Scene" className={`${style["scene-display-homeScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={homeSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display street scene
	const displayStreetScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotDefault} className={`${style["scene-display-robot"]}`} />
			<img src={streetScene} alt="Street Scene" className={`${style["scene-display-streetScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={streetSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Function to display final scene
	const displayFinalScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={robotParty} className={`${style["scene-display-robot"]}`} />
			<img src={finalScene} alt="Street Scene" className={`${style["scene-display-finalScene-picture"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={finalSceneAudio} type="audio/mpeg" />
				Tvoj prehliadač nepodporuje audio html element.
			</audio>
		</div>
	);

	// Rendering scene based on the sceneType
	switch (sceneType) {
		case "firstScene":
			return displayFirstScene();
		case "marketplaceScene":
			return displayMarketplaceScene();
		case "mountainsScene":
			return displayMountainsScene();
		case "zooScene":
			return displayZooScene();
		case "homeScene":
			return displayHomeScene();
		case "streetScene":
			return displayStreetScene();
		case "finalScene":
			return displayFinalScene();
		default:
			return null;
	}
};

export default SceneDisplay;
