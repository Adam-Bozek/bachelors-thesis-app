import React, { useState } from "react";

import { checkEmail, checkName, checkPasswords, checkSurname, hashPassword, verifyUserExistance, createUser, apiIPAddress, webProtocol } from "../../Utils";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

const Registration = () => {
  const pageName = "Registrácia";

  const apiAddress = `${webProtocol}://${apiIPAddress}/`;
  const createEndPoint = "userRegister";
  const verifyEndpoint = "verifyUserExistance";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigate = useNavigate();

  // Handles the registration of a new user.
  const registerUser = async (event) => {
    // Prevents the default behavior of the event (e.g., form submission)
    event.preventDefault();

    // Check if the name is valid
    if (!checkName(name)) {
      alert("Zadajte meno");
    }
    // Check if the surname is valid
    else if (!checkSurname(surname)) {
      alert("Zadajte priezvysko");
    }
    // Check if the email is valid
    else if (!checkEmail(email)) {
      alert("Zadajte platý email");
    }
    // Check if the passwords match
    else if (!checkPasswords(password, passwordRepeat)) {
      alert("Zadané heslá sa nezhodujú");
    }
    // If all validations pass, proceed with user registration
    else {
      try {
        // Check if the user already exists
        const userDoesntExists = await verifyUserExistance(email, apiAddress + verifyEndpoint);

        if (userDoesntExists) {
          // If user does not exist, make a POST request to create a new user
          try {
            // Hash the user's password
            const hashedPassword = await hashPassword(password);

            await createUser(name, surname, email, hashedPassword, apiAddress + createEndPoint, navigate);
          } catch (error) {
            console.error('Registration failed:', error);
          }
        } else {
          // Inform the user that a user with the provided email already exists
          alert("User with this email already exists");
        }
      } catch (error) {
        // Handle errors related to hashing the password
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
                <label htmlFor="floatingSurname"> Priezvisko </label> <br />
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
