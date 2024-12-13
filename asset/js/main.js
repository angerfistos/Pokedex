/* ------------------------------ Web component ----------------------------- */
import Header from "../component/header.js";
customElements.define("main-header", Header);

import Historique from "../component/historique.js";
customElements.define("app-historique", Historique);

import Accueil from "../component/accueil.js";
customElements.define("main-accueil", Accueil);

import Pokedex from "../component/pokedex.js";
customElements.define("app-pokedex", Pokedex);

/* ---------------------- Compteur de pokémons capturés --------------------- */
const compteurCaptured = document.querySelector(".compteurcaptured");

/* ---------------------- Compteur de tentatives de capture --------------------- */

const compteurTentative = document.querySelector(".compteurtentative");