import React, { useState } from "react";

import Axios from "axios";

import { checkEmail, checkName, checkPasswords, checkSurname, hashPassword, verifyUserExistance } from "../../Utils";

import Footer from "./Footer";
import Header from "./Header";

const Registration = () => {
  const pageName = "Registrácia";

  const apiAddress = "http://localhost:3001";
  const createEndPoint = "/create";
  const verifyEndpoint = "/verifyUserExistance";

  const apiKey = "8be5864ea8195c870a50d065bcaf5f2e831f188c0ca05091e692b5b96c90fff5";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const registerUser = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!checkName(name)) {
      alert("Zadajte meno");
    } else if (!checkSurname(surname)) {
      alert("Zadajte priezvysko");
    } else if (!checkEmail(email)) {
      alert("Zadajte platý email");
    } else if (!checkPasswords(password, passwordRepeat)) {
      alert("Zadané heslá sa nezhodujú");
    } else {
      try {
        const hashedPassword = await hashPassword(password);
        const userExists = await verifyUserExistance(email, apiAddress + verifyEndpoint);

        if (userExists) {
          Axios.post(apiAddress + createEndPoint, {
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword,
          }, {
            headers: {
              'api-key': apiKey,
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              alert(response.data);
            })
            .catch(err => {
              alert(err);
            });
        } else {
          alert("User with this email already exists");
        }
      } catch (error) {
        console.error("Error hashing password:", error);
      }
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
            <form onSubmit={registerUser}>
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
                  name="password"
                  placeholder="Heslo"
                  value={passwordRepeat}
                  onChange={(event) => setPasswordRepeat(event.target.value)} />
                <label htmlFor="floatingPasswordRepeat"> Zopakujte Heslo </label> <br />
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary py-2 sign-in-btn" type="submit">Zaregistrovať sa</button>
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
