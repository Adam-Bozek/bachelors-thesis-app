import React, { useState } from "react";

import Axios from "axios";

import Footer from "./Footer"
import Header from "./Header"

const Login = () => {
    const pageName = "Prihlásenie";
    const databaseAddress = "http://localhost:3001/"; // Change

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const checkEmail = () => {
    };

    const checkPasswords = () => {
    };

    return (
        <>
            <Header pageName={pageName} />

            <main className="container">
                <h1 className="mt-5 mb-3"> Vitajte naspäť! </h1>
                <p> Sme radi, že ste sa rozhodli prihlasiť späť do našej aplikácie. </p>

                <div className="py-3 body-height">
                    <div className="form-signin">
                        <form>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="input form-control"
                                    id="floatingEmail"
                                    name="Email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <label htmlFor="floatingEmail"> Emailová adresa </label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordMain"
                                    name="Heslo"
                                    placeholder="Heslo"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <label htmlFor="floatingPasswordMain"> Zadajte Heslo </label> <br />
                            </div>
                            <div className="form-check text-start my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="remember-me"
                                    id="flexCheckDefault"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <label className="form-check-label" htmlFor="flexCheckDefault">Zapamätať si ma</label>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary py-2 sign-in-btn" type="submit" >Prihlásiť sa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Login;