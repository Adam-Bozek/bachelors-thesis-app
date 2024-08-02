import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Private Routes */
import Dashboard from "./components/private/DashBoard";
import Controller from "./components/private/game/Controller";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/Dashboard" element={<Dashboard />} />
			<Route path="/Controller" element={<Controller />} />
			<Route path="*" element={<Navigate replace to="/" />} />
		</Routes>
	);
};

export default App;
