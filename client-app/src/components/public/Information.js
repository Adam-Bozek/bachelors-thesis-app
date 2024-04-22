import React from "react";

import Footer from "./Footer";
import Header from "./Header";

const Information = () => {
	const pageName = "Informácie";
	return (
		<>
			<Header pageName={pageName} />

			<Footer />
		</>
	);
};

export default Information;
