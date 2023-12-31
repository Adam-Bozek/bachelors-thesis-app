import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './components/ContextProvider';

/* Public Routes */
import Home from "./components/public/Home";
import Information from "./components/public/Information";
import Login from "./components/public/Login";
import Registration from './components/public/Registration';

/* Private Routes */
import Dashboard from "./components/private/Dashboard";

const App = () => {
    const { isLoggedInValue } = useContext(isLoggedIn);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Information" element={<Information />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />

            {/* Private route auth */}
            {isLoggedInValue && <Route path="/Dashboard" element={<Dashboard />} />}

            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    );
}

export default App;
