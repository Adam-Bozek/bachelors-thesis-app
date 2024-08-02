import React, { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
	// Defining state variables for isLoggedInValue, selectionAnswers, and recognitionAnswers
	const [selectionAnswers, setSelectionAnswers] = useState([]);
	const [recognitionAnswers, setRecognitionAnswers] = useState([]);

	// Providing the context with its values and update functions
	return (
		<Context.Provider
			value={{
				selectionAnswers,
				setSelectionAnswers,
				recognitionAnswers,
				setRecognitionAnswers,
			}}>
			{children}
		</Context.Provider>
	);
};
