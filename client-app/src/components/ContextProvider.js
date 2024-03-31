import React, { createContext, useState } from "react";

// Define the context
export const Context = createContext();

// Define the context provider component
export const ContextProvider = ({ children }) => {
  // Define state variables for isLoggedInValue, selectionAnswers, and recognitionAnswers
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectionAnswers, setSelectionAnswers] = useState([]);
  const [recognitionAnswers, setRecognitionAnswers] = useState([]);

  // Provide the context with its values and update functions
  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        selectionAnswers,
        setSelectionAnswers,
        recognitionAnswers,
        setRecognitionAnswers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
