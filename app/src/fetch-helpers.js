export const fetchPokemon = async () => {
  try {
    const pokemonName = document
      .getElementById('pokemonName')
      .value.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Couldn't find your Pokemon!");
    }
    const data = await response.json();
    console.log(data);
    const pokeSearch = document.getElementById('pokeSearch');
    pokeSearch.addEventListener('submit', fetchPokemon);
  } catch (error) {
    console.error(error);
  }
};
