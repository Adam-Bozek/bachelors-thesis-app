import React from "react";

import Footer from "./Footer"
import Header from "./Header"

const Register = () => {
    const pageName = "Registrácia";
    return (
        <>
            <Header pageName={ pageName }/>
                
            <Footer />
        </>
    );
}

export default Register;