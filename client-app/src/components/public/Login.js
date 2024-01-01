import React, { useState } from "react";

import { checkEmail, hashPassword, checkPassword, verifyUserLogin } from "../../Utils";

import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
  const pageName = "Prihlásenie";
  const apiAddress = "https://localhost:3001/";
  const verifyUserLoginEndpoint = "verifyUserLogin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle user login
  const logInUser = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    try {
      // Check if the entered email is valid
      if (!checkEmail(email)) {
        alert("Zadajte platný email");
      } else if (!checkPassword(password)) {
        // Check if the entered password is valid
        alert("Zadajte heslo");
      } else {
        // Hash the entered password using the hashPassword function
        const hashedPassword = await hashPassword(password);

        // Verify user login using the verifyUserLogin function
        const loginInfo = await verifyUserLogin(email, hashedPassword, apiAddress + verifyUserLoginEndpoint);

        if (loginInfo) {
          // If login is successful, display a success alert
          alert("Úspešné prihlásenie");
        } else {
          // If login fails, display an alert for incorrect password or email
          alert("Nesprávne heslo alebo email");
        }
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      console.error('Error during login:', error);
      alert("Chyba pri prihlásení");
    }
  };

  return (
    <>
      <Header pageName={pageName} />

      <main className="container">
        <h1 className="mt-5 mb-3"> Vitajte naspäť! </h1>
        <p> Sme radi, že ste sa rozhodli prihlasiť späť do našej aplikácie. </p>

        <div className="py-3 body-height">
          <div className="form-signin">
            <form onSubmit={logInUser}>
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
                <button className="btn btn-primary py-2 sign-in-btn" type="submit">Prihlásiť sa</button>
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
