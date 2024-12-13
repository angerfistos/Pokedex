export default class Header extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute("current");

    this.innerHTML = `
    <header class="mt-8 rounded max-w-7xl mx-auto p-8 shadow-lg mb-4">
      <nav class="flex item-center justify-between">
        <img src="/public/image/logo-pokemon.svg" alt="logo" class="w-40 h-40">
        <ul class="flex justify-between items-center gap-4 text-2xl">
            <li>
                <a class="${
                  current === "monde" ? "font-bold" : "font-normal"}" href="./">
                    Monde
                </a>
            </li>
            <li>
                <a class="${
                  current === "pokedex" ? "font-bold" : "font-normal"}" href="/pages/pokedex.html">
                    Pokédex
                </a>
            </li>
            <li>
              <a class="${
                current === "historique" ? "font-bold" : "font-normal"}" href="/pages/historique.html">
                  Historique
              </a>
          </li>
        </ul>
        <compteur class="flex gap-2 items-center justify-items-center text-2xl">
          <p class="text-gray-600 compteurcaptured">
              <!-- Compteur de pokémons capturés -->
          </p>
          <span>sur</span>
          <p class="compteurtentative">
              <!-- Compteur de tentatives de capture -->
          </p>
        </compteur>
      </nav>
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 block mx-auto resetPage">
        Relancer la carte du monde
      </button>
    </header>`;

    /* ---------------------------- Reset de la page ---------------------------- */
    const resetPage = document.querySelector(".resetPage");
    resetPage.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });

    /* -------------------------------- Compteur Attrapé/Capturé -------------------------------- */
    const captured = parseInt(localStorage.getItem("pokemonCaptured")) || 0;
    const attempts = parseInt(localStorage.getItem("attemptCount")) || 0;

    document.querySelector(
      ".compteurcaptured"
    ).innerText = `${captured} capturé`;

    document.querySelector(
      ".compteurtentative"
    ).innerText = `${attempts} essais`;
  }
}

