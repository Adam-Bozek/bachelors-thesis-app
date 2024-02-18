import { createContext, useState } from 'react';

// Define only the isLoggedIn context
const isLoggedIn = createContext();

export const ContextProvider = ({ children }) => {
  // Define state variable for isLoggedInValue
  const [isLoggedInValue, setIsLoggedInValue] = useState(false);

  // Function to update the isLoggedInValue in isLoggedIn context
  const updateIsLoggedIn = (newValue) => {
    setIsLoggedInValue(newValue);
  };

  // Provide isLoggedIn context with its value and update function
  return (
    <isLoggedIn.Provider value={{ isLoggedInValue, updateIsLoggedIn }}>
      {children}
    </isLoggedIn.Provider>
  );
};

// Export isLoggedIn context for use in other components
export { isLoggedIn };
