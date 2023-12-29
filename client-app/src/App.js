import React from 'react';
import { Routes , Route } from 'react-router-dom';

import Home from "./components/Home";
import Information from "./components/Information";
import Login from "./components/Login";
import Registration from './components/Registration';

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Information" element={<Information />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Registration" element={<Registration />} />
            </Routes>
        </div>
    );
}

export default App;