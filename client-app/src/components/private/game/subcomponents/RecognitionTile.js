import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition} from "react-speech-recognition";

import Style from "./styles/Style.module.css";

import { ReactComponent as PlaySVG } from "./svg/play.svg";
import { ReactComponent as PauseSVG } from "./svg/pause.svg";

import { ReactComponent as MicSVG } from "./svg/mic.svg";
import { ReactComponent as MicMutedSVG } from "./svg/mic-mute.svg";

const Tile = ({ imageUrl, onClick }) => (
  <div className="col-md-4 mb-3">
    <div className="card clickable text-center" onClick={onClick}>
      <div className="card-img-center">
        <img src={imageUrl} className={Style["smaller-image"]} alt="" />
      </div>
    </div>
  </div>
);

function Tiles({ question, imgLink, audioFile, moveToNextQuestion }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const audioRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!isRecording && listening) {
      // Speech recognition has stopped
      console.log("Speech recognition stopped");
    }
  }, [isRecording, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  } else if (!isMicrophoneAvailable) {
    return <span>Browser doesn't have a microphone.</span>;
  }

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
      SpeechRecognition.startListening({ language: "sk" });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsRecording(!isRecording);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleTileClick = () => {
    moveToNextQuestion(true);
  };

  return (
    <div className="container" data-bs-theme="light">
      <h1 className="py-4">
        {question}
        {isPlaying ? (
          <PauseSVG onClick={togglePlay} />
        ) : (
          <PlaySVG onClick={togglePlay} />
        )}
        <audio ref={audioRef} onEnded={handleEnded}>
          <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </h1>
      <div className="row justify-content-center">
        <Tile imageUrl={imgLink} onClick={handleTileClick} />
        <p>{transcript}</p>
      </div>
      <button className="btn btn-primary" onClick={toggleRecord}>
        {!isRecording ? (
          <>
            <span>Stop Recording</span>
            <MicMutedSVG />
          </>
        ) : (
          <>
            <span>Start Recording</span>
            <MicSVG />
          </>
        )}
      </button>
    </div>
  );
}

export default Tiles;
