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

import { ReactComponent as CheckSVG } from "./svg/check.svg";
import { ReactComponent as XSVG } from "./svg/x.svg";

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

function Tiles({ question, imgLink, audioFile, moveToNextQuestion }) {
  // States to manage play/pause sound playback and play/pause recording
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenWord, setSpokenWord] = useState("");
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
    setSpokenWord(transcript);
    resetTranscript();
    console.log("Transcript: " + transcript + ". SpokenWord: " + spokenWord);
    setIsEdited(false);
    moveToNextQuestion(true);
  };

  const handleIncorrectTranscript = () => {
    setIsEdited(true);
    setSpokenWord(transcript);
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
                value={spokenWord}
                onChange={(event) => setSpokenWord(event.target.value)}
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
                <CheckSVG />
                <span> Potvrdiť </span>
              </button>
              {!isEdited ? (
                <button
                  className="btn btn-danger p-2 lh-1"
                  type="button"
                  onClick={handleIncorrectTranscript}
                >
                  <XSVG />
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

export default Tiles;
