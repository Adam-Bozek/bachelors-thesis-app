import React, { useState, useEffect, useRef } from "react";

// pozriet blizsie
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

function RecognitionTile({ question, imgLink, audioFile, correctAnswer, moveToNextQuestion }) {
  // States to manage TODO: fill
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenWord, setSpokenWord] = useState("");
  const [preSpokenWord, setPreSpokenWord] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const audioRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition || !isMicrophoneAvailable) {
    return (
      <span>
        Tvoj internetový prehliadač nepodporuje rozpoznávanie zvuku alebo
        mikrofón.
      </span>
    );
  }

  // je to skrinig nie test

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

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

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleCorrectTranscript = () => {
    if (preSpokenWord === "") {
      setSpokenWord(transcript);
    } else {
      setSpokenWord(preSpokenWord);
    }

    setIsEdited(false);
    console.log("Transcript: " + transcript + ". SpokenWord: " + spokenWord);
    moveToNextQuestion(checkAnswer);
  };

  // TODO: function that will check whether the word is correct or not
  const checkAnswer = (inputtedAnswer) => {
    const correctAnswerTransformed = removeAccentsAndLowerCase(correctAnswer);
    const inputtedAnswerTransformed = removeAccentsAndLowerCase(inputtedAnswer);

    
  }

  const removeAccentsAndLowerCase = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }; 

  const handleIncorrectTranscript = () => {
    setIsEdited(true);
    setPreSpokenWord(transcript);
  };

  return (
    <div className="container" data-bs-theme="light">
      <h1 className="py-4 d-flex align-items-center justify-content-between">
        {question}

        <div className="d-flex">
          {listening ? (
            <MicMutedSVG onClick={toggleRecord} />
          ) : (
            <MicSVG onClick={toggleRecord} />
          )}

          {isPlaying ? (
            <PauseSVG onClick={togglePlay} />
          ) : (
            <PlaySVG onClick={togglePlay} />
          )}
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
                value={preSpokenWord}
                onChange={(event) => setPreSpokenWord(event.target.value)}
              />
              <label htmlFor="floatingName"> Odpoveď dieťaťa </label> <br />
            </div>
          )}

          {!listening && transcript.length > 0 ? (
            <div className="d-flex gap-2 justify-content-center pt-1 pb-1">
              <button
                className="btn btn-success p-2 lh-1"
                type="button"
                onClick={handleCorrectTranscript}
              >
                <AcceptSVG />
                <span> Potvrdiť </span>
              </button>
              {!isEdited ? (
                <button
                  className="btn btn-danger p-2 lh-1"
                  type="button"
                  onClick={handleIncorrectTranscript}
                >
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
