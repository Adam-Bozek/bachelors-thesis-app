import React, { useState } from "react";

import Axios from "axios";

import Footer from "./Footer"
import Header from "./Header"

const Register = () => {
    const pageName = "Registrácia";
    const databaseAddress = "http://localhost/create";

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const checkEmail = () => {
        const emailRegex = /^[a-zA-Z0-9](.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*.[a-zA-Z]{2,6}$/;
        return emailRegex.test( email );
    };
    
    const checkPaswords = () => {
        if ( password === passwordRepeat ) {
            return true;
        } else {
            return false;
        }
    };

    const checkIfUserExists = () => {
        return false;
    };

    const addUsers = () => {
        if ( checkIfUserExists ) {
            alert( "Použivateľ z touto emailovou adresou už existuje" );
        } else if ( checkEmail ) {
            alert( "Zadaná emailová adresa nie je platná" );
        } else if ( checkPaswords ) {
            alert ( "Heslá sa musia zhodovať" );
        } else {
            Axios.post(databaseAddress, {
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
                                    value={ name }
                                    onChange={ ( event ) => setName( event.target.value ) }
                                />
                                <label htmlFor="floatingName">Meno</label> <br/>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="text"
                                    className="input form-control"
                                    id="floatingSurname"
                                    name="Priezvysko"
                                    placeholder="Priezvysko"
                                    autoComplete="family-name"
                                    value={ surname }
                                    onChange={ ( event ) => setSurname( event.target.value ) }
                                />
                                <label htmlFor="floatingSurname"> Priezvysko </label> <br/>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="input form-control"
                                    id="floatingEmail"
                                    name="Email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    value={ email }
                                    onChange={ ( event ) => setEmail( event.target.value ) }
                                />
                                <label htmlFor="floatingEmail"> Emailová adresa </label> <br/> 
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordMain"
                                    name="Heslo"
                                    placeholder="Heslo"
                                    autoComplete="new-password"
                                    value={ password }
                                    onChange={ ( event ) => setPassword( event.target.value ) }
                                />
                                <label htmlFor="floatingPasswordMain"> Zadajte Heslo </label> <br/> 
                            </div>
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="input form-control"
                                    id="floatingPasswordRepeat"
                                    name="Heslo"
                                    placeholder="Heslo"
                                    autoComplete="new-password"
                                    value={ passwordRepeat }
                                    onChange={ ( event ) => setPasswordRepeat( event.target.value ) }
                                />
                                <label htmlFor="floatingPasswordRepeat"> Zopakujte Heslo </label> <br/> 
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary py-2 sign-in-btn" type="submit" onClick={addUsers}>Zaregistrovať sa</button>
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