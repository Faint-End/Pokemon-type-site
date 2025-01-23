import { getData } from './fetch-helpers';

export const getPokemon = (pokemonData) => {
  const listObj = {
    pokemonList: [],
  };
  pokemonData.forEach(async (pokemon) => {
    const pokeInfo = await getData(pokemon.url);
    listObj.pokemonList.push(pokeInfo);
  });
};
