import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Information = () => {
	const pageName = "Informácie";
	return (
		<>
			<Header pageName={pageName} />

			<main className="container mt-1">
				<p className="lead">
					Táto karta informuje o potencinálnych nedostatkoch aplikácie.
				</p>

				<div className="card mb-4 mt-5">
					<div className="card-body">
						<h3 className="card-title">Registrácia</h3>
						<p className="card-text">Položka heslo momentálne nemá žiadne obmedzenia, čo sa týka dĺžky, ale políčko musí byť vyplnené.</p>
						<p className="card-text">Registrácia pomocou emailu, ktorý už bol registrovaný, bude neúspešná.</p>
					</div>
				</div>

				<div className="card mb-4">
					<div className="card-body">
						<h3 className="card-title">Prihlásenie</h3>
						<p className="card-text">
							Momentálne <strong>nie je</strong> implementovaná možnosť obnoviť alebo resetovať heslo, ak bude heslo zabudnuté alebo nesprávne zadané. To
							isté platí aj pre email.
						</p>
					</div>
				</div>

				<div className="card mb-4">
					<div className="card-body">
						<h3 className="card-title">Aplikácia</h3>
						<p className="card-text">
							Hra môže obsahovať viaceré chyby, keďže nebola dôkladne otestovaná. Jedna zo známych chýb je, že ak sa nevyplnia všetky otázky, výsledky
							nebudú zobrazené správne. Preto odporúčame otázky vyplňovať za radom.
						</p>
						<p className="card-text">Pokiaľ sa stane, že výsledky budú zobrazené nesprávne, zopakujte hru.</p>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default Information;
