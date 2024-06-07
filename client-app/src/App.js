import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./components/ContextProvider";

/* Public Routes */
import Home from "./components/public/Home";
import Information from "./components/public/Information";
import Login from "./components/public/Login";
import Registration from "./components/public/Registration";

/* Private Routes */
import Dashboard from "./components/private/DashBoard";
import Controller from "./components/private/game/Controller";

const App = () => {
	const { isLoggedIn } = useContext(Context);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Information" element={<Information />} />
			<Route path="/Login" element={<Login />} />
			<Route path="/Registration" element={<Registration />} />

			{/* Private route auth */}
			{isLoggedIn && <Route path="/Dashboard" element={<Dashboard />} />}
			{isLoggedIn && <Route path="/Controller" element={<Controller />} />}

			<Route path="*" element={<Navigate replace to="/" />} />
		</Routes>
	);
};

export default App;
