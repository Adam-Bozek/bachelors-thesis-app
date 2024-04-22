import React, { useState, useRef } from "react";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

import { ReactComponent as MicSVG } from "./svg/mic.svg";
import { ReactComponent as MicMutedSVG } from "./svg/mic-mute.svg";

import { ReactComponent as AcceptSVG } from "./svg/check.svg";
import { ReactComponent as DeclineSVG } from "./svg/x.svg";

// Tile component to render an image
const Tile = ({ imageUrl }) => (
	<div className="col-md-4 mb-3">
		<div className="card clickable text-center">
			<div className="card-img-center">
				<img src={imageUrl} className={Style["smaller-image"]} alt="" />
			</div>
		</div>
	</div>
);

// RecognitionTile component for handling speech recognition
function RecognitionTile({ question, imgLink, audioFile, correctAnswer, moveToNextQuestion }) {
	// States to manage
	const [isPlaying, setIsPlaying] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [spokenWord, setSpokenWord] = useState("");
	const [isEdited, setIsEdited] = useState(false);

	const audioRef = useRef(null);

	// Necessary variables from useSpeechRecognition hook
	const { transcript, finalTranscript, resetTranscript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();

	// Return message if browser doesn't support speech recognition or microphone is unavailable
	if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
		return <span>Tvoj internetový prehliadač nepodporuje rozpoznávanie zvuku alebo mikrofón.</span>;
	}

	// Function to toggle play/pause of audio
	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Function to toggle start/stop recording speech
	const toggleRecord = () => {
		if (isRecording) {
			SpeechRecognition.stopListening();
			setIsRecording(false);
		} else {
			resetTranscript(transcript);
			SpeechRecognition.startListening({ language: "sk" });
			setIsRecording(true);
		}
	};

	// Function to handle end of audio playback
	const handleEnded = () => {
		setIsPlaying(false);
	};

	// Function to handle correct transcript
	const handleCorrectTranscript = () => {
		setIsEdited(false);
		if (spokenWord !== "") {
			moveToNextQuestion(checkAnswer(spokenWord));
		} else {
			moveToNextQuestion(checkAnswer(finalTranscript));
		}
		resetTranscript();
	};

	// Function to check if the answer is correct
	const checkAnswer = (inputtedAnswer) => {
		const correctAnswerTransformed = removeAccentsAndLowerCase(correctAnswer);
		const inputtedAnswerTransformed = removeAccentsAndLowerCase(inputtedAnswer);

		return correctAnswerTransformed === inputtedAnswerTransformed;
	};

	// Function to remove accents and convert to lowercase
	const removeAccentsAndLowerCase = (string) => {
		return string
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();
	};

	// Function to handle incorrect transcript
	const handleIncorrectTranscript = () => {
		setIsEdited(true);
		setSpokenWord(finalTranscript);
	};

	return (
		<div className="container" data-bs-theme="light">
			<h1 className="py-4 d-flex align-items-center justify-content-between">
				{question}

				<div className="d-flex">
					{listening ? <MicMutedSVG onClick={toggleRecord} /> : <MicSVG onClick={toggleRecord} />}

					{isPlaying ? <PauseSVG onClick={togglePlay} /> : <PlaySVG onClick={togglePlay} />}
				</div>

				<audio ref={audioRef} onEnded={handleEnded}>
					<source src={audioFile} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>
			</h1>
			<div className="row justify-content-center">
				<Tile imageUrl={imgLink} />

				<div className="row-md-4 mb-3">
					{!isEdited ? (
						<p className="text-center pt-3"> {transcript} </p>
					) : (
						<div className="form-floating">
							<input
								type="text"
								className="input form-control"
								id="floatingName"
								value={spokenWord}
								onChange={(event) => setSpokenWord(event.target.value)}
							/>
							<label htmlFor="floatingName"> Odpoveď dieťaťa </label> <br />
						</div>
					)}

					{!listening /*&& transcript.length > 0*/ ? (
						<div className="d-flex gap-2 justify-content-center pt-1 pb-1">
							<button className="btn btn-success p-2 lh-1" type="button" onClick={handleCorrectTranscript}>
								<AcceptSVG />
								<span> Potvrdiť </span>
							</button>
							{!isEdited ? (
								<button className="btn btn-danger p-2 lh-1" type="button" onClick={handleIncorrectTranscript}>
									<DeclineSVG />
									<span> Odmietnuť </span>
								</button>
							) : (
								<></>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
}

export default RecognitionTile;
