export default class Accueil extends HTMLElement {
  async connectedCallback() {
    this.pokemons = await this.fetchPokemons(); 
    this.displayTable(this.pokemons); 
    this.createModal(); 
  }

  /* ------------- Appel‹ de la méthode fetchPokemons dans data.js ------------ */
  async fetchPokemons() {
    const pokemons = [];
    const pokemonCount = 50;
    const maxPokemonId = 898;

    const selectedIds = [];
    while (selectedIds.length < pokemonCount) {
      const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
      if (!selectedIds.includes(randomId)) {
        selectedIds.push(randomId);
      }
    }

    for (const id of selectedIds) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const types = data.types.map((type) => type.type.name).join(", ");
        const sprite = data.sprites.front_default;
        const speed = data.stats.find(
          (stat) => stat.stat.name === "speed"
        ).base_stat;

        pokemons.push({ id, name, type: types, sprite, speed });
      } catch (error) {
        console.error(`Erreur avec le Pokémon ${id}: `, error);
      }
    }

    return pokemons;
  }

  displayTable(pokemons) {
    this.innerHTML = "";
    const table = document.createElement("table");
    table.className = "items-center w-full text-sm text-center border-collapse";

    const thead = document.createElement("thead");
    thead.className = "text-sm text-gray-800 uppercase bg-gray-200";

    const tbody = document.createElement("tbody");
    tbody.className = "text-gray-700 bg-white divide-y divide-gray-300";

    thead.innerHTML = `
      <tr>
        <th class="px-4 py-2 border-b">Numéro</th>
        <th class="px-4 py-2 border-b">Nom</th>
        <th class="px-4 py-2 border-b">Types</th>
        <th class="px-4 py-2 border-b">Vitesse</th>
      </tr>
    `;

    pokemons.forEach((pokemon) => {
      const row = document.createElement("tr");
      row.className = "hover:bg-gray-100 cursor-pointer";
      row.innerHTML = `
        <td class="px-4 py-2 border-b">${pokemon.id}</td>
        <td class="px-4 py-2 border-b">${pokemon.name}</td>
        <td class="px-4 py-2 border-b">${pokemon.type}</td>
        <td class="px-4 py-2 border-b">${pokemon.speed}</td>
      `;

      row.addEventListener("click", () => this.showModal(pokemon));
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    this.appendChild(table);
  }

  createModal() {
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 flex items-center justify-center hidden bg-black bg-opacity-50";
    modal.id = "pokemon-modal";

    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-lg font-bold text-gray-800 mb-4" id="modal-title"></h2>
        <img class="w-32 h-32 mx-auto mb-4" id="modal-image" src="" alt="Pokémon">
        <div class="flex justify-between">
          <button id="catch-btn" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Tenter d'attraper</button>
          <button id="close-btn" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Fermer</button>
        </div>
        <p id="result-message" class="text-center mt-4"></p>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector("#close-btn");
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.querySelector("#result-message").innerText = "";
    });

    const catchBtn = modal.querySelector("#catch-btn");
    catchBtn.addEventListener("click", () => this.attemptCatch());
  }

  showModal(pokemon) {
    const modal = document.getElementById("pokemon-modal");
    modal.querySelector("#catch-btn").disabled = false;
    modal.querySelector(
      "#modal-title"
    ).innerText = `Voulez-vous essayer d'attraper ${pokemon.name} ?`;
    modal.querySelector("#modal-image").src = pokemon.sprite;
    modal.classList.remove("hidden");
    this.currentPokemon = pokemon;
  }

  async attemptCatch() {
    const modal = document.getElementById("pokemon-modal");
    const resultMessage = modal.querySelector("#result-message");
    modal.querySelector("#catch-btn").disabled = true;

    const lancede20 = Math.floor(Math.random() * 20) + 1;
    const vitesse = Math.ceil(this.currentPokemon.speed / 10);

    console.log(`Lancé de dé: ${lancede20}`);
    console.log(`Vitesse du Pokémon: ${vitesse}`);

    if (lancede20 >= vitesse) {
      resultMessage.innerHTML = `<span class="text-green-500 font-bold">Vous avez réussi à attraper ${this.currentPokemon.name} !</span>`;
    } else {
      resultMessage.innerHTML = `<span class="text-red-500 font-bold">${this.currentPokemon.name} s'est échappé !</span>`;
    }

    this.pokemons = await this.fetchPokemons();
    this.displayTable(this.pokemons);
  }
}
