import React from "react";

import { NavLink } from 'react-router-dom';

const Home = ({ style }) => {
    return (
        <>
            <footer className="container">
                <div className="py-3 my-4">
                    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                        <li class="nav-item"> <NavLink to="/" className="nav-link px-2 text-body-secondary"> Domov </NavLink> </li>
                        <li class="nav-item"> <NavLink to="/" className="nav-link px-2 text-body-secondary"> Informácie </NavLink> </li>
                        <li class="nav-item"> <NavLink to="/" className="nav-link px-2 text-body-secondary"> Prihlásenie </NavLink> </li>
                        <li class="nav-item"> <NavLink to="/" className="nav-link px-2 text-body-secondary"> Registrácia </NavLink> </li>
                    </ul>
                    <p class="text-center text-body-secondary">&copy; 2023 Adam Božek. Všetky práva vyhradené.</p>
                </div>
            </footer>

        </>
    );
}

export default Home;