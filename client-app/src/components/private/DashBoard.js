import React from 'react';

import Header from "./Header";
import Footer from "./Footer";

import {test} from "../../Utils";

const Dashboard = () => {
    const pageName = "Informačný panel";

    const handleLOL = () => {
        test("alojz@loo.com", "pass");
    }

    return(
        <>
            <Header pageName={pageName}/>

            <button onClick={handleLOL} className='btn container container' > CLICK ME </button>

            <Footer />
        </>
    );
};

export default Dashboard;