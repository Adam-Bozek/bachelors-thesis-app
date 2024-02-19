import React from 'react';

import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {
    const pageName = "Informačný panel";

    return(
        <>
            <Header pageName={pageName}/>


            <Footer />
        </>
    );
};

export default Dashboard;