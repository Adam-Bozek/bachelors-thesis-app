import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../ContextProvider";
import { checkEmail, checkPassword, verifyUserLogin, apiIPAddress, webProtocol } from "../../Utils";

import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
	const pageName = "Prihlásenie";
	const apiAddress = `${webProtocol}://${apiIPAddress}/`;
	const verifyUserLoginEndpoint = "userLogin";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setIsLoggedIn } = useContext(Context);

	const navigate = useNavigate();

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
				// Verify user login using the verifyUserLogin function
				// Password is not encrypted in app due to transfer trough https protocol and bcrypt compare function
				const loginInfo = await verifyUserLogin(email, password, apiAddress + verifyUserLoginEndpoint);

				if (loginInfo) {
					// If login is successful, redirect to Dashboard
					setIsLoggedIn(true);
					navigate("/Dashboard");
				} else {
					// If login fails, display an alert for incorrect password or email
					alert("Nesprávne heslo alebo email");
				}
			}
		} catch (error) {
			// Handle any errors that occur during the login process
			console.error("Error during login:", error);
			alert("Chyba pri prihlásení");
		}
	};

	return (
		<>
			<Header pageName={pageName} />

			<main className="container">
				<h1 className="mt-5 mb-3"> Vitajte naspäť! </h1>
				<p> Sme radi, že ste sa rozhodli prihlásiť späť do našej aplikácie. </p>

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
								<label htmlFor="floatingPasswordMain"> Zadajte Heslo </label>
								<br />
							</div>
							<div className="d-flex gap-2">
								<button className="btn btn-primary py-2 sign-in-btn" type="submit">
									Prihlásiť sa
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Login;
