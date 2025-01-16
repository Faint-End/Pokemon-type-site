export const fetchPokemon = async (e) => {
  e.preventDefault();

  try {
    const pokemonName = document
      .getElementById('pokemonName')
      .value.toLowerCase();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error(
        `Couldn't find your Pokemon! ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

//v2
export const fetchPokemonList = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');

    if (!response.ok) {
      throw Error(`Fetch failed. ${response.status} ${response.statusText}`);
    }
    const allPokemonData = await response.json();
    console.log('here is the data: ', allPokemonData);

    return allPokemonData;
  } catch (error) {
    console.log('Error caught! ' + error.message);
    return null;
  }
};
