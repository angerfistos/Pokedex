/* -------------------------------- Appel API ------------------------------- */
const url = "https://pokeapi.co/api/v2/pokemon?limit=300"; // URL de l'API pour récupérer les 300 premiers Pokémon

export const fetchPokemon = async () => {
  try {
    const response = await fetch(url); // On fait la requête à l'API
    const data = await response.json(); // On convertit la réponse au format JSON

    console.log(data); // On affiche la structure des données pour vérifier

    const pokemonData = await Promise.all(
      data.results.map(async (pokemon) => {
        // On boucle sur chaque Pokémon de la liste 'results'
        const pokemonResponse = await fetch(pokemon.url); // On récupère les détails du Pokémon
        const pokemonDetails = await pokemonResponse.json(); // On convertit la réponse au format JSON
        return pokemonDetails; // On retourne les détails du Pokémon
      })
    );

    return pokemonData; // On retourne toutes les données des Pokémon
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon :", error);
  }
};


