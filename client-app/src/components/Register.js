import React, { useState } from "react";

import Axios from "axios";

import Footer from "./Footer"
import Header from "./Header"

const Register = () => {
    const pageName = "Registrácia";
    const databaseAddress = "http://localhost:3001/";
    const endPoint = "/create";

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordRepeat, setPasswordRepeat] = useState(null);
    const [userExists, setUserExists] = useState(false);

    const checkName = () => {
        if ( name == null ) {
            return false;
        }

        return true;
    };

    const checkSurname = () => {
        if ( surname == null ) {
            return false;
        }

        return true;
    };

    const checkEmail = () => {
        const emailRegex = /^[a-zA-Z0-9](.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const checkPaswords = () => {
        if (password != null && passwordRepeat != null && password === passwordRepeat) {
            return true;
        }
        return false;
    };

    const checkIfUserExists = async () => {
        try {
            const response = await fetch(`${databaseAddress}checkUser?email=${email}`);

            const result = await response.json();

            setUserExists(result.exists);

            return result.exists;
        } catch (error) {
            console.error("Error checking user existence:", error);
            return false;
        }
    };

    const addUser = () => {
        if( !checkName() ) {
            alert("Zadajte meno");
        } else if ( !checkSurname() ) {
            alert("Zadajte priezvysko");
        } else if ( !checkEmail() ) {
            alert("Zadajte platý email");
        } else if ( !checkIfUserExists() ) {
            alert("Používateľ s takouto emailovou adresou už existuje");
        } else if ( !checkPaswords() ) {
            alert("Zadané heslá sa nezhodujú");
        } else {
            Axios.post(databaseAddress + endPoint, {
                name: name,
                surname: surname,
                email: email,
                password: password
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
                                    name="Meno"
                                    placeholder="Meno"
                                    autoComplete="given-name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="floatingName">Meno</label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="input form-control"
                                    id="floatingSurname"
                                    name="Priezvysko"
                                    placeholder="Priezvysko"
                                    autoComplete="family-name"
                                    value={surname}
                                    onChange={(event) => setSurname(event.target.value)}
                                />
                                <label htmlFor="floatingSurname"> Priezvysko </label> <br />
                            </div>
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
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <label htmlFor="floatingPasswordMain"> Zadajte Heslo </label> <br />
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordRepeat"
                                    name="Heslo"
                                    placeholder="Heslo"
                                    autoComplete="new-password"
                                    value={passwordRepeat}
                                    onChange={(event) => setPasswordRepeat(event.target.value)}
                                />
                                <label htmlFor="floatingPasswordRepeat"> Zopakujte Heslo </label> <br />
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary py-2 sign-in-btn" type="submit" onClick={addUser}>Zaregistrovať sa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Register;