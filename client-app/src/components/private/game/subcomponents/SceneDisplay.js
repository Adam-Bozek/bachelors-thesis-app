import React, { useState, useRef, useEffect } from "react";

import style from "./styles/Style.module.css";

// TODO: Rename cabuu to robot
import cabuuDefault from "../data/pictures/gif/cabuu-default.gif";

import firstScene from "../data/pictures/scenes/firstScene.png";
import firstSceneAudio1 from "../data/audio/scene_audio/firstScene-1.mp3";
import firstSceneAudio2 from "../data/audio/scene_audio/firstScene-2.mp3";
import monster from "../data/pictures/scenes/monster.jpeg";

import marketplaceScene from "../data/pictures/scenes/marketplaceScene.png";
import marketplaceSceneAudio from "../data/audio/scene_audio/marketplaceScene.mp3";

import mountainsScene from "../data/pictures/scenes/mountainsScene.png";
import zooScene from "../data/pictures/scenes/zooScene.png";
import homeScene from "../data/pictures/scenes/homeScene.jpeg";
import streetScene from "../data/pictures/scenes/streetScene.png";

/*import finalScene from "../data/pictures/scenes/finalScene.png"*/

const SceneDisplay = ({ sceneType, advanceToNextCategory }) => {
	const [secondAudioPlayed, setSecondAudioPlayed] = useState(false);

	const [isPlaying, setIsPlaying] = useState(false);

	const audioRef = useRef(null);

	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}

		setIsPlaying(!isPlaying);
	};

	const handleEnded = () => {
		if (!secondAudioPlayed) {
			// If the first audio ended and second audio hasn't been played yet
			audioRef.current.src = firstSceneAudio2; // Change audio source to second audio file
			audioRef.current.play(); // Play the second audio file
			setSecondAudioPlayed(true); // Set the flag to indicate that second audio has been played
		} else {
			// If both audios have been played, reset the state
			setIsPlaying(false);
			setSecondAudioPlayed(false);
		}
	};

	useEffect(() => {
		togglePlay();
	}, []);

	const displayFirstScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={cabuuDefault} className={`${style["scene-display-firstScene-cabuu"]}`} />
			<img src={firstScene} className={`${style["scene-display-firstScene-picture"]}`} />

			<img src={monster} className={`${style["scene-display-firstScene-monster"]}`} />
			<audio ref={audioRef} onEnded={handleEnded}>
				<source src={firstSceneAudio1} type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
		</div>
	);

	const displayMarketplaceScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={marketplaceScene} alt="Marketplace Scene" className={`${style["scene-display-firstScene-picture"]}`} />
		</div>
	);

	const displayMountainsScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={mountainsScene} alt="Mountains Scene" />
		</div>
	);

	const displayZooScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={zooScene} alt="Zoo Scene" />
		</div>
	);

	const displayHomeScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={homeScene} alt="Home Scene" />
		</div>
	);

	const displayStreetScene = () => (
		<div className={`${style["scene-display-div"]} container`}>
			<img src={streetScene} alt="Street Scene" />
		</div>
	);

	const displayFinalScene = () => <div className={`${style["scene-display-div"]} container`}>{/* JSX for finalScene */}</div>;

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
			return null; // Or return a default scene or an error message
	}
};

export default SceneDisplay;
