import React from "react";

import Footer from "./Footer"
import Header from "./Header"

const Home = () => {
    const pageName = "Domov";
    return (
        <>
            <Header pageName={ pageName }/>
                
            <Footer />
        </>
    );
}

export default Home;