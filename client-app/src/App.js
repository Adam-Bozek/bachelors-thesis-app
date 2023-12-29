import React from 'react';
import { Routes , Route } from 'react-router-dom';

import Home from "./components/public/Home";
import Information from "./components/public/Information";
import Login from "./components/public/Login";
import Registration from './components/public/Registration';

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