import React from "react";

import Footer from "./Footer";
import Header from "./Header";

const Home = () => {
  const pageName = "Domov";
  return (
    <>
      <Header pageName={pageName} />

      <main className="container">
        <h1 className="header">Vitajte!</h1>
      </main>

      <Footer />
    </>
  );
};

export default Home;
