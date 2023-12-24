import React from "react";

import Footer from "./Footer"
import Header from "./Header"

const Login = () => {
    const pageName = "Prihlásenie";
    return (
        <>
            <Header pageName={ pageName }/>
                
            <Footer />
        </>
    );
}

export default Login;