import { createContext, useState } from 'react';

const MyContext = createContext();
const isLoggedIn = createContext();

export const ContextProvider = ({ children }) => {
  const [value, setValue] = useState('Initial Value');
  const [isLoggedInValue, setIsLoggedInValue] = useState(true);

  const updateValue = (newValue) => {
    setValue(newValue);
  };

  const updateIsLoggedIn = (newValue) => {
    setIsLoggedInValue(newValue);
  };

  return (
    <MyContext.Provider value={{ value, updateValue }}>
      <isLoggedIn.Provider value={{ isLoggedInValue, updateIsLoggedIn }}>
        {children}
      </isLoggedIn.Provider>
    </MyContext.Provider>
  );
};

export default MyContext;
export { isLoggedIn };
