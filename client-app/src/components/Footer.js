import React from "react";

import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <footer className="container">
                <div className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                        <li className="nav-item"> <NavLink to="/" className="nav-link px-2 text-body-secondary"> Domov </NavLink> </li>
                        <li className="nav-item"> <NavLink to="/Information" className="nav-link px-2 text-body-secondary"> Informácie </NavLink> </li>
                        <li className="nav-item"> <NavLink to="/Login" className="nav-link px-2 text-body-secondary"> Prihlásenie </NavLink> </li>
                        <li className="nav-item"> <NavLink to="/Registration" className="nav-link px-2 text-body-secondary"> Registrácia </NavLink> </li>
                    </ul>
                    <p className="text-center text-body-secondary">&copy; 2023 Adam Božek. Všetky práva vyhradené.</p>
                </div>
            </footer>
        </>
    );
}

export default Home;