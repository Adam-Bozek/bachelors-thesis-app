import React from "react";

import { year } from "../../Utils";

const Footer = () => {
    return (
        <>
            <footer className="container">
                <div className="py-3 my-4">
                    <p className="text-center text-body-secondary border-top py-3">&copy; {year} Adam Božek. Všetky práva vyhradené.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;