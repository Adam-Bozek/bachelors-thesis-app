import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Context } from "../ContextProvider";

const Header = ({ pageName }) => {
	const { setSelectionAnswers, setRecognitionAnswers } = useContext(Context);
	const navigate = useNavigate();

	const handleReset = () => {
		setSelectionAnswers([]);
		setRecognitionAnswers([]);
	};

	const handlePlayGame = () => {
		handleReset();
		navigate("/Controller");
	};

	return (
		<>
			<header className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
					<div className="col-md-3 mb-2 mb-md-0">
						<NavLink to="/Dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
							<span className="fs-4"> {pageName} </span>
						</NavLink>
					</div>

					<div className="col-md-3 text-end">
						<button type="button" className="btn btn-outline-primary me-2" onClick={handlePlayGame}>
							Spustiť hru
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
