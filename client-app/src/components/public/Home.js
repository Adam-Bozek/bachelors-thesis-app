import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  const pageName = "Domov";
  return (
    <>
      <Header pageName={pageName} />

      <main className="container mt-5">
        <div className="text-center">
          <h1 className="display-4">Vitajte!</h1>
          <p className="lead">
            Táto webová aplikácia využíva skrátenú verziu testu TEKOS II na hodnotenie detí.
          </p>
        </div>

        <div className="mt-5">
          <div className="alert alert-warning" role="alert">
            <strong>Upozornenie!</strong> Registráciou do tejto aplikácie súhlasíte s uložením vašich osobných údajov <strong> (meno, priezvisko, email a heslo) </strong> na serveri. 
            Táto aplikácia bola vytvorená len na demonštráciu funkčnosti bakalárskej práce, preto dáta nemusia byť dostatočne zabezpečené.
          </div>
          
          <p className="mb-4">Výsledky testu nie sú odosielané do databázy a zostávajú len vo webovom prehliadači.</p>

					<h3 className="mb-3">Návod na spustenie aplikácie</h3>

          <ol className="list-group list-group-numbered mb-4">
            <li className="list-group-item">Registrujte sa v karte "Registrácia".</li>
            <li className="list-group-item">Prihláste sa v karte "Prihlásenie".</li>
            <li className="list-group-item">Spustite hru.</li>
          </ol>

          <p>Pre viac informácií o postupe navštívte kartu "Informácie".</p>

          <div className="card mt-5">
            <div className="card-body">
              <p className="card-text">
                Táto webová aplikácia je súčasťou praktickej časti bakalárskej práce ktorá bola vytvorená na Technickej univerzite v Košiciach na tému:
                <br />
                <strong>Gamifikácia terapeutických nástrojov pre oblasť rečových a sluchových porúch.</strong>
                <br />
                Vedúci práce: doc. Ing. Stanislav Ondáš, PhD.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
