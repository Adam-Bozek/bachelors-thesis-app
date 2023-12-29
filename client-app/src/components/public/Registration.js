// Spravit este nezobrazovanie na konzole input callback(): blur HESLO

import React, { useState } from "react";

import Axios from "axios";

import { SHA256 } from 'crypto-js';

import Footer from "./Footer"
import Header from "./Header"

const Registration = () => {

    const pageName = "Registrácia";
    const databaseAddress = "http://localhost:3001/"; //Change
    const endPoint = "/create";

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const checkName = () => {
        if (name === "") {
            return false;
        }

        return true;
    };

    const checkSurname = () => {
        if (surname === "") {
            return false;
        }

        return true;
    };

    const checkEmail = () => {
        const emailRegex = /^[a-zA-Z0-9](.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const checkPaswords = () => {
        if (password !== "" && passwordRepeat !== "" && password === passwordRepeat) {
            return true;
        }
        return false;
    };

    const checkIfUserExists = async () => {
        return true;
        // eslint-disable-next-line
        { /*try {
            const response = await fetch(`${databaseAddress}checkUser?email=${email}`);
            const result = await response.json();
            return !result.exists;
        } catch (error) {
            console.error("Error checking user existence:", error);
            return false;
        }*/
        }
    };

    const hashPassword = (password) => {
        return SHA256(password).toString();
    };

    const registerUser = () => {
        if (!checkName()) {
            alert("Zadajte meno");
        } else if (!checkSurname()) {
            alert("Zadajte priezvysko");
        } else if (!checkEmail()) {
            alert("Zadajte platý email");
        } else if (!checkIfUserExists()) {
            alert("Používateľ s takouto emailovou adresou už existuje");
        } else if (!checkPaswords()) {
            alert("Zadané heslá sa nezhodujú");
        } else {
            Axios.post(databaseAddress + endPoint, {
                name: name,
                surname: surname,
                email: email,
                password: hashPassword(password)
            }).catch(err => {
                console.error(err);
            });
        }
    };

    return (
        <>
            <Header pageName={pageName} />

            <main className="container">
                <h1 className="mt-5 mb-3"> Ďakujeme, že ste sa rozhodli zaregistrovať! </h1>
                <p> Práve vaša registrácia nám dokáže pomôcť k zlepšeniu aplikácie a väčšiemu dosahu tejto aplikácie. </p>

                <div className="py-3 body-height">

                    <div className="form-signin">
                        <form>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="input form-control"
                                    id="floatingName"
                                    name="name"
                                    placeholder="Meno"
                                    autoComplete="given-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)} />
                                <label htmlFor="floatingName">Meno</label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="input form-control"
                                    id="floatingSurname"
                                    name="surname"
                                    placeholder="Priezvysko"
                                    autoComplete="family-name"
                                    value={surname}
                                    onChange={(event) => setSurname(event.target.value)} />
                                <label htmlFor="floatingSurname"> Priezvysko </label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="input form-control"
                                    id="floatingEmail"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)} />
                                <label htmlFor="floatingEmail"> Emailová adresa </label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordMain"
                                    name="password"
                                    placeholder="Heslo"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)} />
                                <label htmlFor="floatingPasswordMain"> Zadajte Heslo </label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordRepeat"
                                    name="Heslo"
                                    placeholder="Heslo"
                                    value={passwordRepeat}
                                    onChange={(event) => setPasswordRepeat(event.target.value)} />
                                <label htmlFor="floatingPasswordRepeat"> Zopakujte Heslo </label> <br />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary py-2 sign-in-btn" type="submit" onClick={registerUser}>Zaregistrovať sa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Registration;